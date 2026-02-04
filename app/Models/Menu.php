<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'category',
        'name',
        'level_order',
        'url',
        'target',
        'type',
        'file',
        'image',
        'is_active',
        'block_type',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

//    public function category() {
//        return $this->belongsTo(MenuCategoryEnum::class, 'category_id', 'id');
//    }

    public function translations(): HasMany
    {
        return $this->hasMany(MenuTranslation::class, 'menu_id', 'id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Menu::class, 'parent_id', 'id');
    }

    public function file(): MorphOne
    {
        return $this->morphOne(File::class, 'reference');
    }

//    protected static function newFactory()
//    {
//        return MenuFactory::new();
//    }
}
