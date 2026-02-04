<?php

namespace App\Http\Middleware;

use App\Enums\MenuCategoryEnum;
use App\Facades\TourismService\TripService;
use App\Facades\WebsiteService\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;
class LinksMiddleware extends Middleware
{

    protected $rootView = 'app';
    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }
    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $mainLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::MAIN_MENU->value, '-'));
        $socialLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::SOCIAL_MENU->value, '-'));
        $contactLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::CONTACT_MENU->value, '-'));
        $footerLinks = MenuService::getActiveLinks(Str::slug(MenuCategoryEnum::FOOTER_MENU->value, '-'));
        $packages = TripService::packages();
//        return $next($request);
        return [
            ...parent::share($request),
            'links' => [
                'mainLinks' => $mainLinks,
                'socialLinks' => $socialLinks,
                'contactLinks' => $contactLinks,
                'footerLinks' => $footerLinks,
            ],
            'packages' => $packages,
        ];
    }
}
