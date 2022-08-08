<?php

namespace App\Services;

use App\Models\User;

class UserEditService {

    public function __construct(private User $user, private array $data)
    {
        
    }

    public function updateImage()
    {

    }

    public function updateData()
    {
        try {
            $this->user->update($this->data);
        } catch (\Throwable $th) {
            return $th;
        }
        return $this->user;
    }
}