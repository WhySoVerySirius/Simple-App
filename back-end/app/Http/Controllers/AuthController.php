<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\LoginService;
use App\Services\RegisterService;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest): array
    {
        $loginService = new LoginService($loginRequest);
        return $loginService->authenticate();
    }

    public function register(RegisterRequest $registerRequest)
    {
        $registerService = new LoginService($registerRequest);
        return $registerService->register();
    }
}

