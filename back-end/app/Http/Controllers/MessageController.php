<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersonalMessageReplyRequest;
use App\Services\MessageReplyService;
use App\Services\ValidatorService;
use App\Traits\UserIdentifyTrait;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use UserIdentifyTrait;

    public function personalMessageReply(PersonalMessageReplyRequest $request): string|array
    {
        $data = (new ValidatorService($request))->validate();
        if ($this->user() !== 'fail') {
            return $data['status'] === 'success'
                ?(new MessageReplyService($data['data'],$this->user()))->resolve()
                :'failure';
        }
        return 'logout';
    }
}
