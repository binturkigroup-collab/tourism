<?php

namespace App\Models;

use App\Helper\SlugHelper;
use Database\Factories\BlockTranslationFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockTranslation extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'block_id',
        'name',
        'description',
        'brief',
        'slug',
        'language',
        'is_visible',
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

    public function block(): BelongsTo
    {
        return $this->belongsTo(Block::class, 'block_id', 'id');
    }

    protected static function newFactory(): BlockTranslationFactory|Factory
    {
        return BlockTranslationFactory::new();
    }
}
