<?php

Namespace App\Services;

use App\Models\User;
use App\Services\ApiTokenService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\ValidatedInput;

class LoginService
{

    private ValidatedInput $loginData;
    private ApiTokenService $apiTokenService;
    private ValidatorService $validator;

    public function __construct(protected object $request)
    {
        $this->apiTokenService = new ApiTokenService;
        $this->validator = new ValidatorService($request);
    }

    public function authenticate(): array
    {
        $data = $this->validator->validate();
        if ($data->status === $this->validator::SUCCESS) {
            $loginType = filter_var($data->data->login,FILTER_VALIDATE_EMAIL)?'email':'login';
            if (auth()->attempt([$loginType=>$data->data->login, 'password'=>$data->data->password], $data->data->remember)) {
                $tokenResponse = $this->apiTokenService->update(auth()->user(),$data->data->remember?true:false);
                return $tokenResponse;
            }
            return ['status' => 'failure'];
        }
    }

    public function register():array
    {
        $data = $this->validator->validate();
        if ($data->status === $this->validator::SUCCESS) {
            $user = User::create((array)$data->data);
            if ($user) {
                $tokenResponse = $this->apiTokenService->update($user);
                return $tokenResponse;
            }
            return ['status' => 'something went wrong'];
        }
        return ['status' => 'failure', 'data' =>(array)$data->data];
    }

    public function passwordReset():RedirectResponse
    {
        $this->request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/',
        ]);
     
        $status = Password::reset(
            $this->request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->setRememberToken(Str::random(60));
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
                    ? redirect('http://localhost:3000/login')
                    : back()->withErrors(['email' => [__($status)]]);
    }
}