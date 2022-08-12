<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowTeamsResource;
use App\Models\Team;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TeamsController extends Controller
{
    use UserIdentifyTrait;


    public function show():AnonymousResourceCollection
    {
        return ShowTeamsResource::collection($this->user()->assignedTeam);
    }

    public function showTeamExpanded()
    {
        return Team::find(request()->id);
    }
}
