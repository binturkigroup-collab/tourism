<?php

namespace App\Facades\RealEstateService;

use Illuminate\Support\Facades\Facade;

class AgentService extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'AgentService';
    }
}
