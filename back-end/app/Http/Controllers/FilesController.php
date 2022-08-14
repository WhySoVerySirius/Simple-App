<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadImageRequest;
use App\Services\StorageService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    use UserIdentifyTrait;

    public function uploadImage(UploadImageRequest $request)
    {
        return (new StorageService($this->user(), $request))->store();
    }
}
