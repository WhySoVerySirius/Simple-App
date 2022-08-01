<?php

Namespace App\Services;

use App\Http\Controllers\ApiTokenController;
use App\Models\User;
use Illuminate\Support\ValidatedInput;

class LoginService {
    private ValidatedInput $loginData;
    private ApiTokenController $apiTokenController;

    public function __construct(ValidatedInput $loginData)
    {
        $this->loginData = $loginData;
        $this->apiTokenController = new ApiTokenController;
    }

    public function authenticate(): array
    {
        $loginType = filter_var($this->loginData->login,FILTER_VALIDATE_EMAIL)?'email':'login';
        if (auth()->attempt([$loginType=>$this->loginData->login, 'password'=>$this->loginData->password])) {
            return $this->apiTokenController->update(auth()->user());
        }
        return ['status' => 'failure'];
    }
}