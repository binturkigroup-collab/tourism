<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BlockView extends Model
{
    use HasFactory;

    protected $table = 'blocks_view';

    protected $fillable = [];

    protected static function newFactory()
    {
        return \Modules\Website\Database\factories\BlockViewFactory::new();
    }
}
