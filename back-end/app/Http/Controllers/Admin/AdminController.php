<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddUserToTeamRequest;
use App\Http\Requests\RemoveUserFromTeamRequest;
use App\Http\Requests\UpdateTeamProjectRequest;
use App\Http\Resources\AdminTeamsResource;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use App\Services\AdminActionService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    use UserIdentifyTrait;

    private const NOT_AUTHORIZED = ['status' => 'Not authorized'];

    public function getData(): array
    {
        return $this->admin()
            ?[
                'status' => 'success',
                'data' => [
                    'users' => User::with('role')->get(),
                    'projects' => Project::with(['projectManager', 'assignedTeams', 'messages', 'files'])->get(),
                    'teams' => AdminTeamsResource::collection(
                        (Team::with(['assignedLeader','assignedProject','messages','usersInTeam'])->get())
                    ),
                    ]
                ]
            :self::NOT_AUTHORIZED;
    }

    public function addUserToTeam(AddUserToTeamRequest $request,string $teamId):array
    {
        return $this->admin()
            ?(new AdminActionService($request->safe()))->addUserToTeam($teamId)
            :self::NOT_AUTHORIZED;
    }
    
    public function updateTeamProject(UpdateTeamProjectRequest $request, string $projectId):array
    {
        return $this->admin()
            ?(new AdminActionService($request->safe()))->updateTeamProject($projectId)
            :self::NOT_AUTHORIZED;
    }

    public function removeUserFromTeam(RemoveUserFromTeamRequest $request, string $teamId):array
    {
        return $this->admin()
            ?(new AdminActionService($request->safe()))->removeUserFromTeam($teamId)
            :self::NOT_AUTHORIZED;
    }


    public function removeProjectFromTeam()
    {
        return true;
    }
}
