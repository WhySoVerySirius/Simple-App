<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\support\Str;

class ApiTokenController extends Controller
{
    public function update(User $user)
    {
        $token = Str::random(60);
 
        $user->forceFill([
            'api_token' => hash('sha256', $token),
        ])->save();
 
        return ['status' => 'success', 'token' => $token];
    }
}
