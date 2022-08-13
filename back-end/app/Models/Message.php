<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'author',
        'message_mode',
        'content',
    ];

    public function messageAuthor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author');
    }

    public function privateMessageTarget(): BelongsTo
    {
        return $this->belongsTo(User::class, 'target');
    }

    public function teamMessage(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    public function projectMessage(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
