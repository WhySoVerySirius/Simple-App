<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamMember extends Pivot
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'team_members';

    public function member(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assignedTeam(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
