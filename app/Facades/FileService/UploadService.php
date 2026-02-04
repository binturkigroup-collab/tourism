<?php

namespace App\Facades\FileService;

use Illuminate\Support\Facades\Facade;

/**
 * @method deleteFile(int $id, string $container): void
 */
class UploadService extends Facade
{
    protected static function getFacadeAccessor(): string
    { return 'UploadService'; }
}
