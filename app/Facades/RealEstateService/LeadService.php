<?php

namespace App\Facades\RealEstateService;

use Illuminate\Support\Facades\Facade;

class LeadService extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'LeadService';
    }
}
