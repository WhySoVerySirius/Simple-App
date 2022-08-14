<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectFile;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class StorageService {
    private const LOGOUT = ['status' => 'logout'];
    private const FAILURE = ['status' => 'failure'];
    private const SUCCESS = ['status' => 'success'];
    private const FILE = 'file';
    private const LINK = 'link';
    private const IMAGE = 'image';

    private AuthorizationService $authorization;
    private ValidatorService $validator;

    public function __construct(private User|string $user, private object $request)
    {
        $this->authorization = new AuthorizationService($user);
        $this->validator = new ValidatorService($request);
    }

    public function store():array
    {
        if ($this->user !== 'fail') {
            $evalData = $this->evalContent();
            if (is_object($evalData)) {
                $status = [];
                if ($evalData->type === self::IMAGE) {
                    $status = $this->storeImage($evalData->data);
                }
                if ($evalData->type === self::LINK) {
                    $status = $this->storeLink($evalData->data);
                }
                if ($evalData->type === self::FILE) {
                    $status = $this->storeFile($evalData->data);
                }
                return $status;
            }
            return self::FAILURE;
        }
        return self::LOGOUT;
    }

    public function retrieve()
    {

    }

    private function storeFile(object $data)
    {
        $path = Storage::putFile("public/files/{$data->project_id}", $data->file);
        if ($path) {
            $file = new ProjectFile(['repository' => 'local', 'path' => $data->path]);
            $project = Project::findOrFail($data->project_id);
            $file->fileOwner()->associate($this->user);
            $file->project()->associate($project);
            $file->save();
            return self::SUCCESS;
        }
        return self::FAILURE;
        }

    private function storeImage(object $data): array
    {
        if ($this->user->image_path) {
            if (Storage::exists($this->user->image_path)) {
                Storage::delete($this->user->image_path);
            }
        }
        $path = Storage::putFile("public/images/{$data->id}",$data->file);
        if ($path) {
            $this->user->update(['image_path' => $path]);
            return ['status' => 'success', 'data' => asset("images/{$this->user->id}/".pathinfo($path,PATHINFO_BASENAME))];
        }
        return self::FAILURE;
        // $this->user->update(['image_path' => asset("images/{$this->user->id}/".pathinfo($path,PATHINFO_BASENAME))]);
    }

    private function storeLink(object $data)
    {
        $file = new ProjectFile(['repository' => $data->repo, 'path' => $data->path]);
        $project = Project::findOrFail($data->project_id);
        $file->fileOwner()->associate($this->user);
        $file->project()->associate($project);
        if ($file->save()) {
            return self::SUCCESS;
        }
        return self::FAILURE;
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
            return (object)['type' => $type, 'data' => $validatedData->data];
        }
        return self::FAILURE;
    }
}