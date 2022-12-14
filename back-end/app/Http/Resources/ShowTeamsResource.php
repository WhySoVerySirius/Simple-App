<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShowTeamsResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'position'=>$this->pivot->team_position,
            'team_leader' => new TeamLeaderResource($this->assignedLeader),
            'projects' => HomepageProjectsResource::collection($this->assignedProject)
        ];
    }
}
