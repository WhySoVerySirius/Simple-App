<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class NewTeamCreatedResource extends JsonResource
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
            'team_leader' => [
                'id' => $this->assignedLeader->id,
                'name' => $this->assignedLeader->full_name
            ],
            'projects' => [],
            'team_id' => $this->id,
            'team_title' => $this->title,
            'messages' => [],
            'members' => [],
        ];
    }
}
