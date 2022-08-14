<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadFileRequest;
use App\Http\Requests\GetProjectFilesRequest;
use App\Http\Requests\UploadFileRequest;
use App\Http\Requests\UploadImageRequest;
use App\Http\Requests\UploadLinkRequest;
use App\Services\StorageService;
use App\Traits\UserIdentifyTrait;

class FilesController extends Controller
{
    use UserIdentifyTrait;

    public function uploadImage(UploadImageRequest $request):array
    {
        return (new StorageService($this->user(), $request))->store();
    }

    public function getProjectFiles(GetProjectFilesRequest $request):array
    {
        return (new StorageService($this->user(),$request))->showProjectFiles();
    }

    public function uploadLink(UploadLinkRequest $request):array
    {
        return (new StorageService($this->user(), $request))->store();
    }

    public function uploadFile(UploadFileRequest $request):array
    {
        return (new StorageService($this->user(), $request))->store();
    }

    public function downloadFile(DownloadFileRequest $request)
    {
        return (new StorageService($this->user(), $request))->retrieve();
    }
}
