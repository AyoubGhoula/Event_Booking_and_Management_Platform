<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Declaration extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'evenement_id',
        'participant_id',
        'status',
    ];

    public function evenement() {
        return $this->belongsTo(Evenement::class);
    }

    public function participant() {
        return $this->belongsTo(Participant::class);
    }

}
    