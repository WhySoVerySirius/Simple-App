<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\LoginService;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest): array
    {
        $loginService = new LoginService($loginRequest);
        return $loginService->authenticate();
    }

    public function register(RegisterRequest $registerRequest): array
    {
        $loginService = new LoginService($registerRequest);
        return $loginService->register();
    }


}

