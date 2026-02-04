<?php

namespace App\Facades\TourismService;

use Illuminate\Support\Facades\Facade;

class AppointmentService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'AppointmentService'; }
}
