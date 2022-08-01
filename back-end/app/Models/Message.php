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
        return $this->belongsTo(Team::class);
    }

    public function projectMessage(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
