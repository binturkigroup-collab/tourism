<?php

namespace App\Models;

use Database\Factories\AgentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agent extends Model
{
    /** @use HasFactory<AgentFactory> */
    use HasFactory;

    protected $fillable = [
        'block_id',
        'email',
        'phone',
        'is_active',
    ];

    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(
            Block::class,
            AgentProperty::class,
            'agent_id',
            'property_id',
            'id',
        );
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'agent_id', 'id');
    }

    public function block(): belongsTo
    {
        return $this->belongsTo(Block::class, 'block_id', 'id');
    }
}
