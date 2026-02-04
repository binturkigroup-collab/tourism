<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\TourismService\TripService;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use App\Models\BlockTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TripController extends Controller
{
    public function index(): Response
    {
        $packages = TripService::packages();

        $trips = TripService::normalTrips();

//        $tags = BlockService::etActiveBlocks(Str::slug(BlockCategoryEnum::TAG->value, '-'));
        return Inertia::render('Site/Trips/Trips', [
            'packages' => $packages,
            'trips' => $trips,
//            'tags' => $tags,
            'seo' => [
                'title' => 'Calendar',
                'description' => 'Calendar',
            ],
        ]);
    }

    public function show(string $trip): Response
    {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $trip)
            ->firstOrFail();
        $block = $translation->block;
        request()->merge(['category' => Str::slug(BlockCategoryEnum::TRIP->value)]);
        $trip = TripService::mapLocaleBlockModel($block);
        $trips = TripService::normalTrips();
        return Inertia::render('Site/Trips/TripDetails', [
            'trip' => $trip,
            'trips' => $trips,
        ]);
    }
}
