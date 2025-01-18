<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'description',
        'date_debut',
        'date_fin',
        'localisation',
        'organisateur_id',
        'nb_max_participants',
        'nb_participants',
        'prix',
    ];
    public function organisateur() {
        return $this->belongsTo(Organisateur::class);
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
