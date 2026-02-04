<?php

namespace App\Facades\UserService\AdminService;

use Illuminate\Support\Facades\Facade;

class AdminService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'AdminService'; }
}
