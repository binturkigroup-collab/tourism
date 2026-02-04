<?php

namespace App\Models;

use Database\Factories\PropertyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Property extends Model
{
    /** @use HasFactory<PropertyFactory> */
    use HasFactory;

    protected $fillable = [
        'block_id',
        'developer_id',
        'community_id',
        'city_id',
        'is_active',
        'features',
        'status',
        'price',
        'area',
        'number_of_beds',
    ];
    public function agents(): BelongsToMany
    {
        return $this->belongsToMany(
            Block::class,
            AgentProperty::class,
            'property_id',
            'agent_id',
            'id'
        );
    }

    public function block(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'block_id', 'id');
    }
    public function developer(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'developer_id', 'id');
    }

    public function community(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'community_id', 'id');
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'city_id', 'id');
    }

    public function files(): MorphMany
    {
        return $this->morphMany(File::class, 'reference');
    }

    public function leads(): MorphMany
    {
        return $this->morphMany(Lead::class, 'reference');
    }


}
