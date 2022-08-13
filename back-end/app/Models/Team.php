<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function assignedLeader():BelongsTo
    {
        return $this->belongsTo(User::class, 'team_leader', 'id');
    }

    public function assignedProject(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'team_projects');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'team_id');
    }

    public function usersInTeam(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')->using(TeamMember::class)->withPivot('team_position');
    }
}
