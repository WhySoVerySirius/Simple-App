<?php

namespace App\Services;

use App\Models\Project;
use App\Models\User;

class AdminActionService {
    public const SUCCESS = ['status' => 'success'];
    public const FAILURE = ['status' => 'failure'];

    private TeamUpdateService $teamUpdateService;
    private ProjectUpdateService $projectUpdateService;

    public function __construct(private $data)
    {
        $this->teamUpdateService = new TeamUpdateService;
        $this->projectUpdateService = new ProjectUpdateService;
    }

    public function addUserToTeam(string $teamId): array
    {
        $this->teamUpdateService->setTeam($teamId);
        $user = User::findOrFail($this->data->user_id);
        if ($user) {
            if ($this->teamUpdateService->addUser($user, $this->data->position)) {
                return self::SUCCESS;
            }
            return self::FAILURE;
        }
        return self::FAILURE;
    }

    public function removeUserFromTeam(string $teamId):array
    {
        $this->teamUpdateService->setTeam($teamId);
        $user = User::findOrFail($this->data->user_id);
        if ($user) {
            if ($this->teamUpdateService->removeUser($user)) {
                return self::SUCCESS;
            }
            return self::FAILURE;
        }
        return self::FAILURE;
    }

    public function updateTeamProject(string $projectId):array
    {
        $this->projectUpdateService->setProject($projectId);
        $project = Project::findOrFail($this->data->project_id);
        if ($project) {
            if ($this->projectUpdateService->updateProjectData($this->data)) {
                return self::SUCCESS;
            }
            return self::FAILURE;
        }
        return self::FAILURE;
    }
}