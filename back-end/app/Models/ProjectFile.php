<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectFile extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'project_files';

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function fileOwner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
