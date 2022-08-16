<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\ValidatedInput;

class ProjectUpdateService {
    private Project $project;

    public function setProject(string $projectId)
    {
        $this->project = Project::findOrFail($projectId);
    }

    public function updateProjectData(ValidatedInput $data)
    {
        return $this->project->update(['deadline' => $data->deadline, 'status' => $data->status])
            ?true
            :false;
    }
}