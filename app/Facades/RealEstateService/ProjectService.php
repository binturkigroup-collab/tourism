<?php

namespace App\Facades\RealEstateService;

use Illuminate\Support\Facades\Facade;

class ProjectService extends Facade
{
    protected static function getFacadeAccessor() {
        return 'ProjectService';
    }
}
