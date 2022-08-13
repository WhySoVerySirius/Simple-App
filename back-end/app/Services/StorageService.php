<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Storage;

class StorageService {
    private const LOGOUT = ['status' => 'logout'];
    private const FAILURE = ['status' => 'failure'];
    private const FILE = 'file';
    private const LINK = 'link';
    private const IMAGE = 'image';

    private AuthorizationService $authorization;
    private ValidatorService $validator;

    public function __construct(private User|string $user, object $request)
    {
        $this->authorization = new AuthorizationService($user);
        $this->validator = new ValidatorService($request);
    }

    public function store()
    {
        if ($this->user !== 'fail') {
            $fileType = $this->evalContent();
            if ($fileType === self::IMAGE) {
                $this->storeImage($this->validator->data);
            }
            if ($fileType === self::LINK) {
                $this->storeLink($this->validator->data);
            }
            if ($fileType === self::FILE) {
                $this->storeFile($this->validator->data);
            }
        }
        return self::LOGOUT;
    }

    private function storeFile(object $data)
    {
        // Storage::
    }

    private function storeImage(object $data)
    {

    }

    private function storeLink(object $data)
    {

    }

    private function evalContent()
    {
        $type = self::LINK;
        $validatedData = $this->validator->validate();
        if ($validatedData->status === $this->validator::SUCCESS) {
            if (is_file($this->request->file)) {
                $type = self::FILE;
            }
            if (is_array(getimagesize($this->request->file))) {
                $type = self::IMAGE;
            }
            return $type;
        }
        return self::FAILURE;
    }
}