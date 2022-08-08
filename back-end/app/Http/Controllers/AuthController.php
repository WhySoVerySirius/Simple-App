<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\LoginService;
use App\Services\RegisterService;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(LoginRequest $loginRequest): array
    {
        $loginService = new LoginService($loginRequest->safe());
        return $loginService->authenticate();
    }

    public function register(RegisterRequest $registerRequest)
    {
        $validator = Validator::make($registerRequest->all(), $registerRequest->rules(),$registerRequest->messages());
        if ($validator->errors()->any()) {
            return $validator->errors()->all();
        }
        if($validator) {
            $registerService = new RegisterService($validator->validated());
            return $registerService->register();
        }
    }
}

