<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminTeamsResource extends JsonResource
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
            'projects' => HomepageProjectsResource::collection($this->assignedProject),
            'team_id' => $this->id,
            'team_title' => $this->title,
            'messages' => GetTeamMessagesResource::collection($this->messages),
            'members' => UsersResource::collection($this->usersInTeam),

        ];
    }
}
