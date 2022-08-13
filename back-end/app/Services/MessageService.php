<?php

namespace App\Services;

use App\Http\Resources\GetTeamMessagesResource;
use App\Mail\PrivateMailSent;
use App\Models\Message;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class MessageService {
    private const SUCCESS = 'success';
    private const FAILURE = ['status' => 'failure'];
    private const LOGOUT = ['status' => 'logout'];
    private const USER_NOT_FOUND = ['status' => 'user not found'];
    private const TEAM_NOT_FOUND = ['status' => 'team not found'];
    private const NOT_ALLOWED = ['status' => 'action not allowed'];

    private ValidatorService $validator;
    private AuthorizationService $authorization;

    public function __construct(private User|string $author, object $request)
    {
        $this->validator = new ValidatorService($request);
        $this->authorization = new AuthorizationService($author);
    }

    public function sendPrivateMessage():array
    {
        $validatedData = $this->validate();
        if (is_object($validatedData)) {
            if ($this->authorization->authorizeMessage($validatedData->author)) {
                $message = new Message(['content' => $validatedData->content]);
                $target = User::findOrFail($validatedData->target_id);
                if ($target) {
                    $message->messageAuthor()->associate($this->author);
                    $message->privateMessageTarget()->associate($target);
                    $message->save();
                    return ['status' => self::SUCCESS, 'type' => 'message'];
                }
                return self::USER_NOT_FOUND;
            }
            return self::NOT_ALLOWED;
        }
        return $validatedData;
    }

    public function sendPrivateEmail():array
    {
        $validatedData = $this->validate();
        if (is_object($validatedData)) {
            if ($this->authorization->authorizeMessage($validatedData->author)) {
                $target = User::findOrFail($validatedData->target_id);
                if ($target) {
                    Mail::to($target->email)->send(new PrivateMailSent($validatedData, $this->author));
                    return ['status' => self::SUCCESS, 'type' => 'email'];
                }
                return self::USER_NOT_FOUND;
            }
            return self::NOT_ALLOWED;
        }
        return $validatedData;
    }

    public function retrieveTeamMessages()
    {
        $validatedData = $this->validate();
        if (is_object($validatedData)) {
            $team = Team::findOrFail($validatedData->team_id);
            if ($team) {
                if ($this->authorization->authorizeTeamMessage($team)) {
                    return [
                        'status' => self::SUCCESS,
                        'data' => GetTeamMessagesResource::collection($team->messages)];
                }
                return self::NOT_ALLOWED;
            }
            return self::TEAM_NOT_FOUND;
        }
        return $validatedData;
    }

    public function sendTeamMessage()
    {
        $validatedData = $this->validate();
        if (is_object(($validatedData))) {
            $team = Team::findOrFail($validatedData->team_id);
            if ($team) {
                if ($this->authorization->authorizeTeamMessage($team)) {
                    $message = Message::create(['content' => $validatedData->content]);
                    $message->message_mode = 'team';
                    $message->messageAuthor()->associate($this->author);
                    $message->teamMessage()->associate($team);
                    if($message->save()) {
                        return ['status' => self::SUCCESS];
                    }
                    return self::FAILURE;
                }
                return self::NOT_ALLOWED;
            }
            return self::TEAM_NOT_FOUND;
        }
        return $validatedData;
    }

    public function retrieveProjectMessages()
    {
        $validatedData = $this->validate();
        if (is_object($validatedData)) {
            $project = Project::findOrFail($validatedData->project_id);
            if ($project) {
                if ($this->authorization->authorizeProjectMessage($project)) {
                    return [
                        'status' => self::SUCCESS,
                        'data' => GetTeamMessagesResource::collection($project->messages)];
                }
                return self::NOT_ALLOWED;
            }
            return self::TEAM_NOT_FOUND;
        }
        return $validatedData;
    }

    public function sendProjectMessage()
    {
        $validatedData = $this->validate();
        if (is_object(($validatedData))) {
            $project = Project::findOrFail($validatedData->project_id);
            if ($project) {
                if ($this->authorization->authorizeProjectMessage($project)) {
                    $message = Message::create(['content' => $validatedData->content]);
                    $message->message_mode = 'project';
                    $message->messageAuthor()->associate($this->author);
                    $message->projectMessage()->associate($project);
                    if($message->save()) {
                        return ['status' => self::SUCCESS];
                    }
                    return self::FAILURE;
                }
                return self::NOT_ALLOWED;
            }
            return self::TEAM_NOT_FOUND;
        }
        return $validatedData;
    }

    private function validate():array|object
    {
        $validatorData = $this->validator->validate();
        if ($this->author !== 'fail') {
            if ($validatorData->status === $this->validator::SUCCESS) {
                return $validatorData->data;
            }
            return self::FAILURE;
        }
        return self::LOGOUT;
    }
}