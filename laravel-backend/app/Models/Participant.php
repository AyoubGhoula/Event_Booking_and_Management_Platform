<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function reservations() {
        return $this->hasMany(Reservation::class);
    }

    public function declarations() {
        return $this->hasMany(Declaration::class);
    }
    public function notifications() {
        return $this->hasMany(Notification::class);
    }
}
