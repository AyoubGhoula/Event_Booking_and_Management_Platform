<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class events extends Model
{
    use HasFactory;
     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', 'start_datetime', 'lient_event', 'prix', 'created_by', 'nm_max', 'nm_participer', 'gender',
    ];
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    protected $appends = [
        'creator_name', 'creator_email',
    ];
    
    public function participants()
    {
        return $this->belongsToMany(User::class, 'event_user');
    }
    public function getCreatorNameAttribute()
    {
        return $this->creator ? $this->creator->name : null;
    }

    // Accessor for creator email
    public function getCreatorEmailAttribute()
    {
        return $this->creator ? $this->creator->email : null;
    }

}
