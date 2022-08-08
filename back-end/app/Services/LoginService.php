<?php

Namespace App\Services;

use App\Services\ApiTokenService;
use Illuminate\Support\ValidatedInput;

class LoginService
{

    private ValidatedInput $loginData;
    private ApiTokenService $apiTokenService;

    public function __construct(ValidatedInput $loginData)
    {
        $this->loginData = $loginData;
        $this->apiTokenService = new ApiTokenService;
    }

    public function authenticate(): array
    {
        $loginType = filter_var($this->loginData->login,FILTER_VALIDATE_EMAIL)?'email':'login';
        if (auth()->attempt([$loginType=>$this->loginData->login, 'password'=>$this->loginData->password])) {
            $tokenResponse = $this->apiTokenService->update(auth()->user());
            return $tokenResponse;
        }
        return ['status' => 'failure'];
    }
}