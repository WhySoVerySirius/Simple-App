<?php

Namespace App\Services;

use App\Services\ApiTokenService;
use App\Models\User;

class RegisterService
{

    private array $registerData;

    public function __construct(array $registerData)
    {
        $this->registerData=$registerData;
    }

    public function register(): array
    {
        $user = User::create([
            'full_name'=>$this->registerData['full_name'],
            'title' => $this->registerData['title'],
            'login' => $this->registerData['login'],
            'email' => $this->registerData['email'],
            'password' => bcrypt($this->registerData['password']),
        ]);
        if ($user) {
            $tokenResponse = (new ApiTokenService)->update($user);
            return $tokenResponse;
        }
        return [
            'status' => 'failed to create a user'
        ];
    }
}