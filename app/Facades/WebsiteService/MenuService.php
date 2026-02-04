<?php

namespace App\Facades\WebsiteService;

use Illuminate\Support\Facades\Facade;

class MenuService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'MenuService'; }
}
