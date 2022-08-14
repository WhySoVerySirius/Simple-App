<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        if ($this->resource === 'fail') {
            return 'Logout';
        }
        return [
            'status' => 'success',
            'token' => $this->api_token,
            'user' => (object)[
                'api_token' => $this->api_token,
                'description' => $this->description,
                'email' => $this->email,
                'full_name' => $this->full_name,
                'id' => $this->id,
                'status' => $this->status,
                'title' => $this->title,
                'image_path' => asset("images/{$this->id}/".pathinfo($this->image_path,PATHINFO_BASENAME))
            ]
        ];
    }
}
