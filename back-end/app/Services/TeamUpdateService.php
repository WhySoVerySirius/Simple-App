<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;

class TeamUpdateService {

    private Team $team;

    public function setTeam(string $team_id):void
    {
        $this->team = Team::findOrFail($team_id);
    }

    public function addUser(User $user, string $position):bool
    {
        $this->team->usersInTeam()->attach($user, ['team_position' => $position]);
        return $this->team->save();
    }

    public function removeUser(User $user):bool
    {
        $this->team->usersInTeam()->detach($user);
        return $this->team->save();
    }

    public function setTeamLeader(string $userId):bool
    {
        $user = User::findOrFail($userId);
        $this->team->assignedLeader()->associate($user);
        return $this->team->save();
    }

    public function removeProject(string $id):bool
    {
        $this->team->assignedProject()->detach($id);
        return $this->team->save();
    }

    public function assignProject(string $id):bool
    {
        $project = Project::findOrFail($id);
        $this->team->assignedProject()->attach($project);
        return $this->team->save();
    }
}