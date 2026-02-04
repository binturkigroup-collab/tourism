<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reference_id',
        'reference_type',
        'email',
        'avatar',
        'is_active',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getName() {
        if ($this->reference()->first() instanceof Customer) {
            return $this->reference()->first()->name;
        }

        if ($this->reference()->first() instanceof Admin) {
            return $this->reference()->first()->first_name . ' ' . $this->userable()->first()->last_name;
        }
    }

//    public function sendPasswordResetNotification($token)
//    {
//        $this->notify(new CustomizedResetPassword($token, $this->getName(), $this->email));
//    }

    protected static function newFactory(): UserFactory
    {
        return UserFactory::new();
    }

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }

    public function avatar(): MorphOne
    {
        return $this->morphOne(File::class, 'reference')->where('is_image', true);
    }

    public function customerView(): HasOne
    {
        return $this->hasOne(CustomerView::class, 'user_id', 'id');
    }

    public function adminView(): HasOne
    {
        return $this->hasOne(AdminView::class, 'user_id', 'id');
    }
}
