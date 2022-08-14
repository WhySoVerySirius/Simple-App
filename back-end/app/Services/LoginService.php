<?php

Namespace App\Services;

use App\Models\User;
use App\Services\ApiTokenService;
use Illuminate\Support\ValidatedInput;

class LoginService
{

    private ValidatedInput $loginData;
    private ApiTokenService $apiTokenService;
    private ValidatorService $validator;

    public function __construct(object $request)
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
        return $data->data;
    }
}