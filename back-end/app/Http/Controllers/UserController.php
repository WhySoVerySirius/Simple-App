<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserEditRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserEditService;
use App\Traits\UserIdentifyTrait;
use App\Http\Resources\UsersResource;
use App\Http\Resources\UserUpdateResource;
use App\Services\SearchAndPaginateService;
use App\Services\ValidatorService;
use Illuminate\Http\Request;
use Throwable;

class UserController extends Controller
{
    use UserIdentifyTrait;

    public function info():UserResource|string
    {
        if ($this->user()) {
            return new UserResource($this->user()); 
        }
        return 'Logout';
    }

    public function edit(UserEditRequest $request):UserUpdateResource|Throwable|array
    {
        $data = (new ValidatorService($request))->validate();
        return $data->status==='success'
            ?new UserUpdateResource((new UserEditService($this->user(),$data->data))->updateData())
            :$data->data;
    }

    public function showUsers(Request $request)
    {
        return (new SearchAndPaginateService($request, User::class, 10))->resolve();
    }
}
