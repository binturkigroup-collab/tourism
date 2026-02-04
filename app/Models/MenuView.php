<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuView extends Model
{
    use HasFactory;

    protected $table = 'menu_view';

    protected $fillable = [];

    protected static function newFactory()
    {
        return \Modules\Website\Database\factories\MenuViewFactory::new();
    }
}
