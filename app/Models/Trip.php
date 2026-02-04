<?php

namespace App\Models;

use Database\Factories\TripFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Trip extends Model
{
    /** @use HasFactory<TripFactory> */
    use HasFactory;

    protected $fillable = [
        'block_id',
        'city_id',
        'price',
        'max_guests',
        'min_age',
        'package',
        'duration',
        'unit',
        'included_features',
        'excluded_features',
    ];

    public function leads(): MorphMany
    {
        return $this->morphMany(Lead::class, 'reference');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'city_id', 'id');
    }
}
