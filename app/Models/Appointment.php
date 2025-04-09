<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = ['user_id', 'with_user_id', 'appointment_time', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function withUser()
    {
        return $this->belongsTo(User::class, 'with_user_id');
    }
}