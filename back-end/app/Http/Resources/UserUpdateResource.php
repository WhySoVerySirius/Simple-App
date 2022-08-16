<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserUpdateResource extends JsonResource
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
            'status' => 'success',
            'user' =>(object)[
                'api_token' => $this->api_token,
                'description' => $this->description,
                'email' => $this->email,
                'full_name' => $this->full_name,
                'id' => $this->id,
                'status' => $this->status,
                'title' => $this->title,
                'image_path' => asset("images/{$this->id}/".pathinfo($this->image_path,PATHINFO_BASENAME)),
                'role'=>$this->role,
            ]
        ];
    }
}
