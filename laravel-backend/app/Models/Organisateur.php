<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organisateur extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_organisation',
        'site_web_organisation',
        'compte_valide',
        'avatar',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function evenements() {
        return $this->hasMany(Evenement::class);
    }

    public function notifications() {
        return $this->hasMany(Notification::class);
    }
}
