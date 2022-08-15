<?php

namespace App\Services;

use App\Models\Project;

class ProjectUpdateService {
    private Project $project;

    public function setProject(string $projectId)
    {
        $this->project = Project::findOrFail($projectId);
    }

    public function updateProjectData(array $data)
    {
        return $this->project->update($data)
            ?true
            :false;
    }
}