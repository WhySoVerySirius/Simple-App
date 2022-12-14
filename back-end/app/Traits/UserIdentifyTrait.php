<?php

namespace App\Traits;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

trait UserIdentifyTrait {
    
    public function user():User|string
    {
        $user = User::where('api_token',request()->header('api_token'))->first();
        if ($user) {
            Cache::put('user.'.request()->header('api_token'), $user, env('USER_CACHE_TTL'));
            return $user;
        }
        return 'fail';
    }

    public function admin():bool
    {
        $authorize = false;
        $user = User::where('api_token',request()->header('api_token'))->first();
        foreach ($user->role as $role) {
            if ($role->role_title === Role::ROLE_ADMIN) {
                $authorize = true;
            }
        }
        return $authorize;
    }
}