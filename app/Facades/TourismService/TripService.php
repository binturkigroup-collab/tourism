<?php

namespace App\Facades\TourismService;

use Illuminate\Support\Facades\Facade;

class TripService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'TripService'; }
}
