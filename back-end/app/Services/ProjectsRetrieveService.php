<?php

namespace App\Services;

use App\Http\Resources\HomepageProjectsResource;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectsRetrieveService {

    public function __construct(private User $user)
    {}

    public function retrieve():AnonymousResourceCollection|string
    {
        $projects = [];
        $teams = $this->getTeams();
        if ($teams) {
            foreach ($teams as $team) {
                $allProjects = $team->assignedProject;
                foreach ($allProjects as $project) {
                    $projects[] = $project;
                }
            }
        }
        if (count($projects) > 0) {
            return HomepageProjectsResource::collection($projects);
        }
        return 'No projects';
    }

    private function getTeams():Collection
    {
        return $this->user->assignedTeam;
    }
}