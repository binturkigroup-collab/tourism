<?php

namespace App\Facades\RealEstateService;

use Illuminate\Support\Facades\Facade;

class PropertyService extends Facade
{
    protected static function getFacadeAccessor(): string {
        return 'PropertyService';
    }
}
