<?php

use App\Http\Controllers\Admin\BlockCategoryController;
use App\Http\Controllers\Admin\BlockController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\MenuController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\PropertyController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\LeadController;
use App\Http\Middleware\AdminAuthenticate;
use App\Http\Middleware\AdminAuthorization;
use App\Http\Middleware\Language;
use App\Http\Middleware\RedirectIfAuthenticated;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
//use Modules\User\Http\Controllers\AdminController;
//use Modules\User\Http\Controllers\AdminUserController;
//use Modules\User\Http\Controllers\CustomerController;

//Route::get('/', [AdminUserController::class, 'index']);

Route::middleware(['language', 'admin.auth'])->get('/', function () {
    return Inertia::render('Admin/Home/Home');
})->name('admin.home');

//Route::middleware(['admin.auth', 'admin.permission'])->group(function () {
//    Route::get('/user/list', [CustomerController::class, 'list']);
//    Route::patch('/user/review/activate', [CustomerController::class, 'review']);
//    Route::patch('/user/list/{user}', [CustomerController::class, 'activate']);
//    Route::get('/user/count', [CustomerController::class, 'count']);
//});

Route::middleware([Language::class, AdminAuthenticate::class, AdminAuthorization::class])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
//    Route::get('/user', [CustomerController::class, 'index']);
//    Route::get('/user/activities/{user}', [CustomerController::class, 'activities']);
//    Route::get('/user/orders/{user}', [CustomerController::class, 'orders']);
//    Route::get('/user/{user}', [CustomerController::class, 'edit']);
});

Route::middleware([Language::class, RedirectIfAuthenticated::class])->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('admin.login');
});

Route::middleware([AdminAuthenticate::class, AdminAuthorization::class])->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('admin.store');

Route::middleware([Language::class, AdminAuthenticate::class, AdminAuthorization::class])->group(function () {
//    Route::get('/', function () {
//        return Inertia::render('Admin/Website/WebsiteContainer');
//    });

//    Route::resource('/block-category', BlockCategoryController::class);
    Route::get('/get-block/{category}', [BlockController::class, 'getBlocks'])->name('admin.blocks');
    Route::get('/block/create/{category}', [BlockController::class, 'create']);
    Route::get('/block/reorder/{category}', [BlockController::class, 'reorder']);
    Route::get('/block/details/{block}', [BlockController::class, 'edit']);

    Route::get('/get-menu/{category}', [MenuController::class, 'getMenus']);
    Route::get('/menu/create/{category}', [MenuController::class, 'create']);
    Route::get('/menu/reorder/{category}', [MenuController::class, 'reorder']);
    Route::get('/menu/details/{menu}', [MenuController::class, 'edit']);

    Route::get('/contact', [ContactController::class, 'index'])->name('admin.contact');
    Route::get('/contact/{contact}', [ContactController::class, 'show'])->name('admin.contact.show');
});

Route::middleware([AdminAuthenticate::class, AdminAuthorization::class])->group(function () {
    Route::post('/block', [BlockController::class, 'store']);
    Route::post('/block/upload/file/{block}', [BlockController::class, 'addImage'])->name('admin.block.image.add');
    Route::patch('/block/upload/file/{block}', [BlockController::class, 'uploadFile']);
    Route::delete('/block/upload/file/{block}', [BlockController::class, 'deleteImage'])->name('admin.block.image.delete');
    Route::patch('/block/activation/{block}', [BlockController::class, 'blockActivation']);
    Route::patch('/block/general-info/{id}', [BlockController::class, 'update_general_info']);
    Route::patch('/block/description/{id}', [BlockController::class, 'update_description_info']);
    Route::patch('/block/translations/{block}', [BlockController::class, 'updateTranslation']);
    Route::delete('/block/{block}', [BlockController::class, 'destroy']);
    Route::post('/block/reorder', [BlockController::class, 'storeReorder']);

    Route::get('/appointments', [AppointmentController::class, 'index'])->name('admin.appointments');
    Route::get('/appointments/create', [AppointmentController::class, 'create']);
    Route::get('/appointments/edit/{appointment}', [AppointmentController::class, 'edit']);
    Route::post('/appointments/create', [AppointmentController::class, 'store'])->name('admin.appointments.create');
    Route::patch('/appointments/update/{appointment}', [AppointmentController::class, 'update'])->name('admin.appointments.update');
    Route::delete('/appointments/delete/{appointment}', [AppointmentController::class, 'destroy'])->name('admin.appointments.delete');

    Route::patch('/contact/agent/{contact}', [ContactController::class, 'agent'])->name('admin.contact.agent.assign');
    Route::delete('/contact/{contact}', [ContactController::class, 'destroy'])->name('admin.contact.destroy');

//    Route::delete('/project/upload/file/{project}', [ProjectController::class, 'deleteImage'])->name('admin.project.image.delete');
//    Route::delete('/property/upload/file/{property}', [PropertyController::class, 'deleteImage'])->name('admin.property.image.delete');


    Route::post('/menu', [MenuController::class, 'store']);
    Route::patch('/menu/{menu}', [MenuController::class, 'update']);
    Route::patch('/menu/upload/file/{menu}', [MenuController::class, 'uploadFile']);
    Route::patch('/menu/activation/{menu}', [MenuController::class, 'menuActivation']);
    Route::delete('/menu/{menu}', [MenuController::class, 'destroy']);
    Route::post('/menu/reorder', [MenuController::class, 'storeReorder']);

    Route::get('/leads', [LeadController::class, 'list'])->name('lead.list');
    Route::get('/lead/get-lead/{lead}', [LeadController::class, 'edit']);
    Route::patch('/lead/remove/{lead}', [LeadController::class, 'removeAgent']);
    Route::patch('/lead/agent/{lead}', [LeadController::class, 'agent']);
    Route::patch('/lead/{lead}', [LeadController::class, 'update']);
    Route::delete('/lead/{lead}', [LeadController::class, 'destroy']);
});

require __DIR__ . '/file.web.php';

//require __DIR__.'/auth.php';
