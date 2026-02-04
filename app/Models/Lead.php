<?php

namespace App\Models;

use Database\Factories\LeadFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Lead extends Model
{
    /** @use HasFactory<LeadFactory> */
    use HasFactory;

    protected $fillable = [
        'reference_id',
        'reference_type',
        'agent_id',
        'name',
        'phone',
        'email',
        'message',
        'action',
    ];

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }

    public function agent(): belongsTo
    {
        return $this->belongsTo(Block::class, 'agent_id', 'id');
    }
}
