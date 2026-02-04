<?php

namespace App\Models;

use App\Models\User;
use Database\Factories\AdminFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Admin extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'role',
    ];

    protected static function newFactory(): AdminFactory
    {
        return AdminFactory::new();
    }

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'reference');
    }

}
