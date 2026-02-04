<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\TourismService\TripService;
use App\Http\Controllers\Controller;
use App\Models\BlockTranslation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PackageController extends Controller
{
    public function index(): Response
    {
        $packages = TripService::packages();
        return Inertia::render('Site/Packages/Packages', [
            'packages' => $packages,
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
        $package = TripService::mapLocaleBlockModel($block);
        $trips = TripService::normalTrips();
        return Inertia::render('Site/Packages/PackageDetails', [
            'tripPackage' => $package,
            'trips' => $trips,
        ]);
    }
}
