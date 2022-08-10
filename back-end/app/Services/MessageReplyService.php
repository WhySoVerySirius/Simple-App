<?php

namespace App\Services;

use App\Models\Message;
use App\Models\User;

class MessageReplyService {
    private object $data;

    public function __construct(array $requestData, private User $user)
    {
        $this->data = (object)$requestData;
    }

    public function resolve():string
    {
        if ($this->authorize()) {
            $message = Message::create(['content'=>$this->data->content]);
            $target = User::find($this->data->reply_target);
            $message->messageAuthor()->associate($this->user);
            $message->privateMessageTarget()->associate($target);
            $message->save();
            return 'success';
        }
        return 'failure';
    }

    private function authorize():bool
    {
        if ($this->user->id == $this->data->author) {
            return true;
        }
        return false;
    }
}