<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory;
    use SoftDeletes;

    public function assignedProject(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'team_projects');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function usersInTeam(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')->using(TeamMember::class);
    }
}
