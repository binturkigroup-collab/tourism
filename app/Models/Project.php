<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'block_id',
        'developer_id',
        'community_id',
        'city_id',
        'lunch_date',
        'lunch_price',
        'status',
        'type',
        'is_active',
        'qr_code',
        'brochure_url',
        'down_payment',
        'youtube_url',
        'construction_payment_rate',
        'handover_payment_rate',
        'payment_plan_type',
        'quarter',
        'handover_date',
    ];

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

    protected $casts = [
        'is_active' => 'boolean',
    ];

}
