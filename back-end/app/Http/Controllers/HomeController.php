<?php

namespace App\Http\Controllers;

use App\Http\Resources\HomeMessagesResource;
use App\Http\Resources\HomepageTeamsResource;
use App\Models\Message;
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

    public function getProjectsData():AnonymousResourceCollection|array
    {
        return (new ProjectsRetrieveService($this->user()))->retrieve();
    }

    public function unreadMessages()
    {
        return HomeMessagesResource::collection(
            Message::where([['target',$this->user()->id],['read', false]])
            ->with('messageAuthor')
            ->orderBy('created_at', 'DESC')
            ->get()
        );
    }

    public function messageRead(string $id)
    {
        $message = Message::find($id);
        if ($this->user()->id === $message->target) {
            $message->read = true;
            $message->save();
        }
    }
}
