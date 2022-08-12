<?php

namespace App\Services;

use App\Mail\PrivateMailSent;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class MessageService {
    private const SUCCESS = 'success';
    private const FAILURE = ['status' => 'failure'];

    private Message $message;
    private User $target;

    public function __construct(private object $data, private User $user)
    {
        $this->message = Message::create(['content'=> $data->content]);
        $this->target = User::find($data->target_id);
    }

    public function sendPrivateMessage():array
    {
        if ($this->authorize()) {
            $this->message->messageAuthor()->associate($this->user);
            $this->message->privateMessageTarget()->associate($this->target);
            $this->message->save();
            return ['status' => self::SUCCESS, 'type' => 'message'];
        }
        return self::FAILURE;
    }

    public function sendPrivateEmail():array
    {
        if ($this->authorize()) {
            Mail::to($this->target->email)->send(new PrivateMailSent($this->data, $this->user));
            return ['status' => self::SUCCESS, 'type' => 'email'];
        }
        return self::FAILURE;
    }

    private function authorize():bool
    {
        if ($this->user->id == $this->data->author) {
            return true;
        }
        return self::FAILURE;
    }
}