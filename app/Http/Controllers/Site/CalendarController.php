<?php

namespace App\Http\Controllers\Site;

use App\Facades\TourismService\TripService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function index(): Response
    {
        $packages = TripService::packages();

        $trips = TripService::normalTrips();

        return Inertia::render('Site/Calendar/Calendar', [
            'packages' => $packages,
            'trips' => $trips,
            'seo' => [
                'title' => 'Calendar',
                'description' => 'Calendar',
            ],
        ]);
    }
}
