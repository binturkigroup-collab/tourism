<?php

namespace App\Models;

use Database\Factories\ContactFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    /** @use HasFactory<ContactFactory> */
    use HasFactory;

    protected $fillable = ['agent_id', 'name', 'phone', 'email','message','type', 'action'];

    public function agent(): belongsTo
    {
        return $this->belongsTo(Block::class, 'agent_id', 'id');
    }
}
