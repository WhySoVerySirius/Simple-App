<?php

Namespace App\Services;

use App\Http\Controllers\ApiTokenController;
use App\Models\User;
use Illuminate\Support\ValidatedInput;

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
            return (new ApiTokenController())->update($user);
        }
        return [
            'status' => 'failed to create a user'
        ];
    }
}