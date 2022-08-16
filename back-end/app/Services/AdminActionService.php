<?php

namespace App\Services;

use App\Http\Resources\NewTeamCreatedResource;
use App\Models\Project;
use App\Models\Team;
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
        if ($this->projectUpdateService->updateProjectData($this->data)) {
            return self::SUCCESS;
        }
        return self::FAILURE;
    }

    public function createTeam():array
    {
        $team = Team::create(['title' => $this->data->title]);
        if ($team) {
            $this->teamUpdateService->setTeam($team->id);
            if ($this->teamUpdateService->setTeamLeader($this->data->team_leader)) {
                $updatedTeam = Team::find($team->id);
                return ['status' => 'success', 'data' => new NewTeamCreatedResource($updatedTeam)];
            }
            return self::FAILURE;
        }
        return self::FAILURE;
    }

    public function removeProjectFromTeam(string $teamId):array
    {
        $this->teamUpdateService->setTeam($teamId);
        if ($this->teamUpdateService->removeProject($this->data->project_id)) {
            return self::SUCCESS;
        }
        return self::FAILURE;
    }

    public function assignProjectToTeam(string $id):array
    {
        $this->teamUpdateService->setTeam($this->data->team_id);
        return $this->teamUpdateService->assignProject($id)
            ?self::SUCCESS
            :self::FAILURE;
    }
}