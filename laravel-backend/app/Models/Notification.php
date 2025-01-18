<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name_evenement',
        'contenu',
        'participant_id',
        'envoye_le',
        'destinataire_id',

    ];

    public function Participant() {
        return $this->belongsTo(Participant::class);
    }
    public function Evenement() {
        return $this->belongsTo(Evenement::class);
    }
    public function Destinataire() {
        return $this->belongsTo(Organisateur::class);
    }


}
