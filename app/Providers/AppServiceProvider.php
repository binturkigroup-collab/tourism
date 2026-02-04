<?php

namespace App\Providers;

use App\Enums\BlockCategoryEnum;
use App\Services\FileService\FileService;
use App\Services\FileService\UploadService;
use App\Services\SettingService\LanguageService;
use App\Services\TourismService\AppointmentService;
use App\Services\TourismService\LeadService;
use App\Services\TourismService\TripService;
use App\Services\UserService\AdminService\AdminService;
use App\Services\UserService\UserService;
use App\Services\WebsiteService\BlockService;
use App\Services\WebsiteService\ContactService;
use App\Services\WebsiteService\MenuService;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('FileService', function ($app) {
            return new FileService();
        });

        $this->app->singleton('UploadService', function ($app) {
            return new UploadService();
        });

        $this->app->singleton('LanguageService', function ($app) {
            return new LanguageService();
        });

//        $this->app->singleton('UserService', function ($app) {
//            return new UserService();
//        });

        $this->app->singleton('UserService', function () {
            //Retrieve user instance for registration:
            $user = request()->user();
            if(is_null($user)) {
                $data = request()->all();

                if (array_key_exists('type', $data)) {

                    switch ($data['type']) {
//                        case 'normal' : {
//                            return new NormalService();
//                        }

                        default : {
                            return new AdminService();
                        }
                    }
                }
                //Retrieve user instance for login:
                else return new UserService();
            }
            else {

                if ($user->reference instanceof Customer) {
                    return new NormalService();
                }

                else {
                    return new AdminService();
                }
            }

        });

        $this->app->singleton('AdminService', function () {
            return new AdminService();
        });

        $this->app->singleton('AdminService', function ($app) {
            return new AdminService();
        });

        $this->app->singleton('BlockService', function ($app) {
            if (request()->has('category')) {
                $category = request()->get('category');
                return match ($category) {
                    Str::slug(BlockCategoryEnum::TRIP->value) => new TripService(),
                    default => new BlockService(),
                };
            }
            else {
                return new BlockService();
            }
        });

        $this->app->singleton('MenuService', function ($app) {
            return new MenuService();
        });

        $this->app->singleton('TripService', function ($app) {
            return new TripService();
        });

        $this->app->singleton('AppointmentService', function ($app) {
            return new AppointmentService();
        });

        $this->app->singleton('LeadService', function ($app) {
            return new LeadService();
        });

        $this->app->singleton('ContactService', function ($app) {
            return new ContactService();
        });


    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
