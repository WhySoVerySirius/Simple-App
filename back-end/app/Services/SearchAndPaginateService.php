<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use Illuminate\Support\Facades\Cache;

class SearchAndPaginateService {
    public function __construct(private Request $request, private $model, private int $entries)
    {}

    public function resolve(string $mode = 'like')
    {
        $maxPage = ceil($this->model::count()/$this->entries);
        if ($this->request->query('search') !==null && $this->request->query('limit') !== null) {
            return [
                'data' => UsersResource::collection(
                    $this->model::where('full_name', $mode, '%'.$this->request->query('search').'%')
                        ->skip(($this->request->query('limit')-1)*$this->entries)
                        ->take($this->entries)
                        ->get()),
                'pages' => $maxPage
            ];
        }
        if ($this->request->query('search') !== null && $this->request->query('limit') === null) {
            return [
                'data' => UsersResource::collection(
                    $this->model::where('full_name', $mode, '%'.$this->request->query('search').'%')
                        ->take($this->entries)
                        ->get()),
                'pages' => $maxPage
            ];
        }
        if ($this->request->query('search') === null && $this->request->query('limit') !== null) {
            return [
                'data' => Cache::remember(get_class($this->model::first()).'.'.($this->request->query('limit')), env('USER_CACHE_TTL'), function () {
                    return UsersResource::collection(
                        $this->model::skip(($this->request->query('limit')-1)*$this->entries)
                            ->take($this->entries)
                            ->get());
                }),
                'pages' => $maxPage
            ];
        }
        return Cache::remember(get_class($this->model::first()).'.all', env('USER_CACHE_TTL'), function () use ($maxPage) {
            return [
                'data' => UsersResource::collection(
                    $this->model::take($this->entries)
                        ->get()),
                'pages' => $maxPage
            ];
        });
    }
}