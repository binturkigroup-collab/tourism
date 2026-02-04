<?php

namespace App\Models;

use Database\Factories\LanguageFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Language extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'flag_code',
        'level_order',
        'is_active',
    ];

    protected static function newFactory(): LanguageFactory|Factory
    {
        return LanguageFactory::new();
    }
}
