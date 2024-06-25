<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class event_user extends Model
{
    use HasFactory;

    protected $table = 'event_user';

    protected $fillable = [
        'event_id', 'user_id',
    ];
}
