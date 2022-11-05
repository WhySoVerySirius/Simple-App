<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetProjectMessagesRequest;
use App\Http\Requests\GetTeamMessagesRequest;
use App\Http\Requests\PersonalEmailSendRequest;
use App\Http\Requests\PersonalMessageSendRequest;
use App\Http\Requests\SendProjectMessageRequest;
use App\Http\Requests\SendTeamMessageRequest;
use App\Http\Resources\GetTeamMessagesResource;
use App\Models\Message;
use App\Services\MessageService;
use App\Services\ValidatorService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use UserIdentifyTrait;

    public function sendPersonalMessage(PersonalMessageSendRequest $request):array
    {
        return (new MessageService($this->user(), $request))->sendPrivateMessage();
    }

    public function sendPersonalEmail(PersonalEmailSendRequest $request):array
    {
        return (new MessageService($this->user(), $request))->sendPrivateEmail();
    }

    public function getTeamMessages(GetTeamMessagesRequest $request):array
    {
        return (new MessageService($this->user(), $request))->retrieveTeamMessages();
    }

    public function sendTeamMessage(SendTeamMessageRequest $request):array
    {
        phpinfo();
        return (new MessageService($this->user(), $request))->sendTeamMessage();
    }

    public function getProjectMessages(GetProjectMessagesRequest $request):array
    {
        return (new MessageService($this->user(), $request))->retrieveProjectMessages();
    }

    public function sendProjectMessage(SendProjectMessageRequest $request):array
    {
        return (new MessageService($this->user(), $request))->sendProjectMessage();
    }
}
