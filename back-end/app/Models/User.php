<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'full_name',
        'title',
        'email',
        'login',
        'password',
        'status',
        'image_path',
        'description',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    public function managedProjects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(ProjectFile::class);
    }

    public function createdMessage(): HasMany
    {
        return $this->hasMany(Message::class, 'author', 'id');
    }

    public function receivedPrivateMessage(): HasMany
    {
        return $this->hasMany(Message::class, 'target', 'id');
    }

    public function assignedTeam(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'team_members')->using(TeamMember::class);
    }
}
