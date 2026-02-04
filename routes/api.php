<?php

use App\Http\Controllers\Admin\BlockController;
use App\Http\Controllers\Site\ProjectController;
use App\Http\Controllers\Site\PropertyController;
use App\Http\Middleware\Language;
use Illuminate\Support\Facades\Route;


Route::get('get-blocks/{category}', [BlockController::class, 'getActiveBlocks']);

Route::middleware([Language::class])->group(function () {
    Route::get('/properties', [PropertyController::class, 'filter']);
    Route::get('/projects', [ProjectController::class, 'filter']);
});
