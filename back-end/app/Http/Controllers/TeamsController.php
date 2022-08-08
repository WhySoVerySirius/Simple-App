<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShowTeamsResource;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamsController extends Controller
{
    public function show()
    {
        return ShowTeamsResource::collection(Team::all());
    }
}
