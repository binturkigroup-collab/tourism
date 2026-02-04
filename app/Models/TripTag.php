<?php

namespace App\Models;

use Database\Factories\TripTagFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripTag extends Model
{
    /** @use HasFactory<TripTagFactory> */
    use HasFactory;

    protected $fillable = [
        'trip_id',
        'tag_id',
    ];
}
