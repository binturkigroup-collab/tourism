<?php

namespace App\Facades\UserService;

use Illuminate\Support\Facades\Facade;

class UserService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'UserService'; }
}
