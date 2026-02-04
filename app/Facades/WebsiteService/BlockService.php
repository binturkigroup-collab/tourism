<?php

namespace App\Facades\WebsiteService;

use Illuminate\Support\Facades\Facade;

class BlockService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'BlockService'; }
}
