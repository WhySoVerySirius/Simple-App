<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;

class AuthorizationService {

    public function __construct(private User|string $author)
    {}

    public function authorizeMessage(string $id): bool
    {
        return $this->author->id == $id;
    }

    public function authorizeTeamMessage(Team $team): bool
    {
        $allow = false;
        $teamMembers = $team->usersInTeam;
        foreach ($teamMembers as $member) {
            if ($member->id === $this->author->id) {
                $allow = true;
            }
        }
        return $allow;
    }

    public function authorizeProject(Project $project)
    {
        $allow = false;
        $projectTeams = $project->assignedTeams;
        $userTeams = $this->author->assignedTeam;
        foreach($projectTeams as $projectTeam) {
            foreach($userTeams as $userTeam) {
                if ($userTeam->is($projectTeam)) {
                    $allow = true;
                }
            }
        }
        return $allow;
    }

}