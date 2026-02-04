<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    public const SITE_HOME = '/';
    public const ADMIN_HOME = '/admin';
    /**
     * The module namespace to assume when generating URLs to actions.
     *
     * @var string
     */
//    protected $moduleNamespace = 'Modules\User\Http\Controllers';

    /**
     * Called before routes are registered.
     *
     * Register any model bindings or pattern based filters.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
//        RateLimiter::for('api', function (Request $request) {
//            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
//        });
//
//        $this->routes(function () {
////            Route::middleware('api')
////                ->prefix('api')
////                ->group(base_path('routes/api.php'));
////
//            Route::middleware('web')
//                ->group(module_path('User','routes/web.php'));
////            =================================================
////            This snippet if no languages required:
////            =================================================
//
//            Route::middleware('web')
//                ->prefix('/admin')
//                ->group(module_path('User','routes/admin.web.php'));
////            =================================================
////            This snippet for languages only:
////            =================================================
//            Route::middleware(['web', 'language'])
//                ->prefix('{locale}/admin')
//                ->where(['locale' => '[a-zA-Z]{2}'])
//                ->group(module_path('User','routes/admin.web.php'));
////            =================================================
//        });
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
//            ->namespace($this->moduleNamespace)
            ->group(base_path('routes/web.php'));

        Route::middleware('web')
            ->prefix('admin')
//            ->namespace($this->moduleNamespace)
            ->group(base_path('routes/admin.web.php'));
//            =================================================
//            This snippet for languages only:
//            =================================================
        Route::middleware(['web'])
            ->prefix('{locale}')
            ->where(['locale' => '[a-zA-Z]{2}'])
            ->group(base_path('routes/web.php'));
//            =================================================
//            =================================================
//            This snippet for languages only:
//            =================================================
        Route::middleware(['web'])
            ->prefix('{locale}/admin')
            ->where(['locale' => '[a-zA-Z]{2}'])
            ->group(base_path('routes/admin.web.php'));
//            =================================================
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
//            ->namespace($this->moduleNamespace)
            ->group(base_path('routes/api.php'));

        Route::prefix('{locale}/api')
            ->middleware('api')
//            ->namespace($this->moduleNamespace)
            ->group(base_path('routes/api.php'));
    }
}
