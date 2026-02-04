<?php

namespace App\Facades\SettingService;

use Illuminate\Support\Facades\Facade;

class LanguageService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'LanguageService'; }
}
