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

        $image = null;
        if ($user->image_path) {
            $image = asset("images/{$user->id}/".pathinfo($user->image_path,PATHINFO_BASENAME));
        }

        return [
            'status' => 'success',
            'token' => $token,
            'user' => (object)[
                'api_token' => $user->api_token,
                'description' => $user->description,
                'email' => $user->email,
                'full_name' => $user->full_name,
                'id' => $user->id,
                'status' => $user->status,
                'title' => $user->title,
                'image_path' => $image,
                'role' => $user->role
            ],
            'remember' => $remember,
            'role' => $user->role,
        ];
    }
}
