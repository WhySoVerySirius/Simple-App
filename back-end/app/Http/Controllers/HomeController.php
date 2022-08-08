<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomepageTeamsResource;
use App\Models\Team;
use App\Models\User;
use App\Services\ProjectsRetrieveService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    use UserIdentifyTrait;

    public function getTeamData()
    {
        return HomepageTeamsResource::collection($this->user()->assignedTeam);
    }

    public function getProjectsData():AnonymousResourceCollection|string
    {
        return (new ProjectsRetrieveService($this->user()))->retrieve();
    }
}
