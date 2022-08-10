<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HomeMessagesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'message_mode' => $this->message_mode,
            'message_id' => $this->id,
            'content' => $this->content,
            'created_at' => date('Y:m:d H:i:s', strtotime($this->created_at)),
            'author' => new HomeMessagesAuthorResource($this->messageAuthor),
        ];
    }
}
