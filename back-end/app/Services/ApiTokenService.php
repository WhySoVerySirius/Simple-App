<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\support\Str;

class ApiTokenService
{
    public function update(User $user, bool $remember = false): array
    {
        $token = Str::random(60);
 
        $user->forceFill([
            'api_token' => $token,
        ])->save();
 
        Cache::put('user.'.$token, $user, env('USER_CACHE_TTL'));

        return [
            'status' => 'success',
            'token' => $token,
            'user' => $user,
            'remember' => $remember,
            'role' => $user->role,
        ];
    }
}
