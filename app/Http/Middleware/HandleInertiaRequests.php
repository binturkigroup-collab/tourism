<?php

namespace  App\Http\Middleware;

use App\Enums\MenuCategoryEnum;
use App\Facades\SettingService\LanguageService;
use App\Facades\UserService\UserService;
use App\Facades\WebsiteService\MenuService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
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
        $user = is_null($request->user()) ? null : UserService::mapUserModel($request->user());

        $logo = 'logo.png';
        $languages = LanguageService::getLanguages();
        $activeLanguages = LanguageService::getActiveLanguages();
        return [
            ...parent::share($request),
            'settings' => [
                'languages' => $languages,
                'activeLanguages' => $activeLanguages,
            ],
            'logo'  => $logo,
            'auth' => [
                'user' => $user,
            ],

            'csrf_token' => csrf_token(),
//            'ziggy' => fn () => [
//                ...(new Ziggy)->toArray(),
//                'location' => $request->url(),
//            ],
        ];
    }
}
