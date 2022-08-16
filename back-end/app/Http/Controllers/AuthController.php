<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\LoginService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
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

    public function resetPassword(Request $request)
    {
        $loginService = new LoginService($request);
        return $loginService->passwordReset();
    }

    public function forgotPassword(Request $request):array
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::sendResetLink($request->only('email'));
        return $status === Password::RESET_THROTTLED || Password::RESET_LINK_SENT
            ?['status' => 'success']
            :['status' => 'failure'];
    }

    public function resetPasswordLink($token):View
    {
        return view('auth.reset-password', ['token' => $token]);
    }
}

