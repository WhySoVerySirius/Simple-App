<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonalEmailSendRequest;
use App\Http\Requests\PersonalMessageSendRequest;
use App\Services\MessageService;
use App\Services\ValidatorService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use UserIdentifyTrait;

    const SUCCESS = ['status' => 'success'];
    const FAILURE = ['status' => 'failure'];
    const LOGOUT = ['status' => 'logout'];

    public function sendPersonalMessage(PersonalMessageSendRequest $request):array
    {
        $data = (new ValidatorService($request))->validate();
        if ($this->user() !== 'fail') {
            return $data->status === 'success'
                ?(new MessageService($data->data,$this->user()))->sendPrivateMessage()
                :self::FAILURE;
        }
        return self::LOGOUT;
    }

    public function sendPersonalEmail(PersonalEmailSendRequest $request)
    {
        $data = (new ValidatorService($request))->validate();
        if ($this->user() !== 'fail') {
            return $data->status === 'success'
                ?(new MessageService($data->data,$this->user()))->sendPrivateEmail()
                :self::FAILURE;
        }
        return self::LOGOUT;
    }
}
