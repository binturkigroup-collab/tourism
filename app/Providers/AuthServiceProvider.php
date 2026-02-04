<?php

namespace App\Providers;

//use Illuminate\Support\ServiceProvider;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    protected $policies = [
        'App\Models\User' => 'App\Policies\UserPolicy',
    ];

    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        Gate::define('admin', [UserPolicy::class, 'admin']);
    }
}
