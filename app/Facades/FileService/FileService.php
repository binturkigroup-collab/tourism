<?php

namespace App\Facades\FileService;


use Illuminate\Support\Facades\Facade;

class FileService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'FileService'; }
}
