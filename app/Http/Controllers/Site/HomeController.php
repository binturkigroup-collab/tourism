<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Enums\MenuCategoryEnum;
use App\Facades\RealEstateService\CommunityService;
use App\Facades\RealEstateService\DeveloperService;
use App\Facades\RealEstateService\ProjectService;
use App\Facades\RealEstateService\PropertyService;
use App\Facades\SettingService\LanguageService;
use App\Facades\TourismService\TripService;
use App\Facades\WebsiteService\BlockService;
use App\Facades\WebsiteService\MenuService;
use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Inertia\Inertia;

//use App\Facades\Blocks\BlockCategoryService;
//use App\Facades\Blocks\BlockService;
//use App\Facades\Languages\LanguageService;
//use App\Facades\Settings\SettingService;
//use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index() {
        $aboutUs = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::TURN_OUR_VISION_INTO_VALUE->value, '-'));

        $homeSlider = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::MAIN_SECTION->value, '-'));

        $packages = TripService::packages();

        $normalTrips = TripService::normalTrips();

        return Inertia::render('Site/Home/Home', [
            'aboutUs' => $aboutUs,
            'mainSliders' => $homeSlider,
            'packages' => $packages,
            'normalTrips' => $normalTrips,
            'seo' => [
                'title' => 'Home',
                'description' => 'Prestige Palace Property',
            ],
        ]);
    }
}
