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

    protected $fillable = [
        'repository',
        'path',
        'file_title',
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function fileOwner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
