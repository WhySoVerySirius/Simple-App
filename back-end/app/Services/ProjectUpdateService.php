<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;
use Illuminate\Support\ValidatedInput;

class ProjectUpdateService {
    private Project $project;

    public function createProject(array $data):void
    {
        $this->project = Project::create($data);
    }

    public function setProject(string $projectId):void
    {
        $this->project = Project::findOrFail($projectId);
    }

    public function updateProjectData(ValidatedInput $data):bool
    {
        return $this->project->update(['deadline' => $data->deadline, 'status' => $data->status])
            ?true
            :false;
    }

    public function delete():bool|null
    {
        return $this->project->delete();
    }

    public function assignProjectManager(string $id):bool
    {
        $user = User::findOrFail($id);
        if ($user) {
            $this->project->projectManager()->associate($user);
            return $this->project->save();
        }
        return false;
    }
}