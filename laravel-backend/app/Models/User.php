<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'email',
        'password',
        'phone',
        'role',
        'actif',
        'email_verified',
        'verification_code',
        'code_expires_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_code',
        'code_expires_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified' => 'boolean',
        'actif' => 'boolean',
        'code_expires_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function organisateur() {
        return $this->hasOne(Organisateur::class);
    }

    public function participant() {
        return $this->hasOne(Participant::class);
    }

    public function admin() {
        return $this->hasOne(Admin::class);
    }
}
