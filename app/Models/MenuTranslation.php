<?php

namespace App\Models;

use App\Helper\SlugHelper;
use Cviebrock\EloquentSluggable\Sluggable;
use Database\Factories\MenuTranslationFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuTranslation extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'menu_id',
        'name',
        'slug',
        'html_text',
        'language',
        'is_active',
    ];

    public function sluggable(): array
    {
        // TODO: Implement sluggable() method.
        Return [
            'slug' => [
                'source' => 'name',
                'method' => function ($string, $separator) {
                    return SlugHelper::slug($string, $separator);
                },
            ],
        ];

    }

    protected static function newFactory(): MenuTranslationFactory|Factory
    {
        return MenuTranslationFactory::new();
    }
}
