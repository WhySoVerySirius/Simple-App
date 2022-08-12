<?php

namespace App\Services;

use App\Models\User;
use Throwable;

class UserEditService {
    public function __construct(public User $user, private object $data)
    {}

    public function updateImage()
    {

    }

    public function updateData():Throwable|User
    {
        try {
            $this->user->update((array)$this->data);
        } catch (\Throwable $th) {
            return $th;
        }
        return $this->user;
    }
}