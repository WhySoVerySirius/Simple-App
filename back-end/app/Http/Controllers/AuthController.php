<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\LoginService;
use App\Services\RegisterService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest): array
    {
        $loginService = new LoginService($loginRequest->safe());
        return $loginService->authenticate();
    }

    public function register(RegisterRequest $registerRequest)
    {
        $validatedData = $registerRequest->validated();
        if($validatedData) {
            $registerService = new RegisterService($registerRequest->validated());
            return $registerService->register();
        }
    }
}
