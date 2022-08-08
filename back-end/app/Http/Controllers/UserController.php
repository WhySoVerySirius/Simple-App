<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserEditRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserEditService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
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

    public function edit(UserEditRequest $request):User|Throwable
    {
        return (new UserEditService($this->user(),$request->safe()))->updateData();
    }
}
