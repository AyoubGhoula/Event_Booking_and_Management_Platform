<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'participant_id',
        'evenement_id',
        'Full_Name',
        'numero_telephone',
        'email',
        'code_unique',
        'status',
    ];

    public function participant() {
        return $this->belongsTo(Participant::class);
    }

    public function evenement() {
        return $this->belongsTo(Evenement::class);
    }

}
