<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PrivacyController;
use App\Http\Controllers\Site\AboutController;
use App\Http\Controllers\Site\BlogController;
use App\Http\Controllers\Site\CalendarController;
use App\Http\Controllers\Site\CommunityController;
use App\Http\Controllers\Site\ContactController;
use App\Http\Controllers\Site\DeveloperController;
use App\Http\Controllers\Site\HomeController;
use App\Http\Controllers\Site\PackageController;
use App\Http\Controllers\Site\ProjectController;
use App\Http\Controllers\Site\PropertyController;
use App\Http\Controllers\Site\RentController;
use App\Http\Controllers\Site\SellController;
use App\Http\Controllers\Site\SitemapController;
use App\Http\Controllers\Site\SitemapXMLController;
use App\Http\Controllers\Site\TripController;
use App\Http\Middleware\Language;
use App\Http\Middleware\LinksMiddleware;
use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});
//
//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');
//
//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});
//
//require __DIR__.'/auth.php';

//Route::get('/', function () {
//    return redirect(\app()->getLocale() . '/home');
//})->name('home');

Route::get('/', function () {
    return redirect(\app()->getLocale() . '/home');
})->name('home');
Route::middleware([Language::class, LinksMiddleware::class])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');
//    Route::get('/block/{category}', [BlockController::class, 'index']);
//    Route::get('/block/details/{category}/{block}', [BlockController::class, 'show']);
});

Route::middleware([Language::class, LinksMiddleware::class])->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/about-us', [AboutController::class, 'index'])->name('about-us');
    Route::get('/contact', [ContactController::class, 'index'])->name('contact-us');

    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('projects.show');

    Route::get('/properties', [PropertyController::class, 'index'])->name('properties');
    Route::get('/properties/{slug}', [PropertyController::class, 'show'])->name('properties.show');

    Route::get('/communities', [CommunityController::class, 'index'])->name('communities');
    Route::get('/communities/{slug}', [CommunityController::class, 'show'])->name('communities.show');

    Route::get('/developers', [DeveloperController::class, 'index'])->name('developers');
    Route::get('/developers/{slug}', [DeveloperController::class, 'show'])->name('developers.show');

    Route::get('/careers', [CareerController::class, 'index'])->name('careers');
    Route::get('/conditions-and-terms', [ConditionController::class, 'index'])->name('conditions-and-terms');
    Route::get('/privacy-policy', [PrivacyController::class, 'index'])->name('privacy-policy');
    Route::get('/blog', [BlogController::class, 'index'])->name('blogs');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blogs.show');

    Route::get('/package', [PackageController::class, 'index'])->name('packages');
    Route::get('/package/{trip}', [PackageController::class, 'show'])->name('packages.show');
//    Route::get('/package/{trip}', function () {
//        dd('HERE');
//    });
    Route::get('/trip', [TripController::class, 'index'])->name('trips');
    Route::get('/trip/{trip}', [TripController::class, 'show'])->name('trips.show');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
});

Route::post('/lead', [LeadController::class, 'store'])->name('lead.store');

Route::post('/send-email', [NotificationController::class, 'sendUserEmail']);

//Route::get('/test', [LeadController::class, 'index'])->name('lead');
Route::get('/test', function () {
    return view('test', [
        'name' => 'Feras',
        'age' => 42,
        'hobbies' => ['Reading', 'Coding', 'Football']
    ]);
});

//Route::get('/html-sitemap', [SitemapController::class, 'html']);
Route::get('/sitemap.xml', [SitemapXMLController::class, 'index']);
Route::get('/sitemap-projects.xml', [SitemapXMLController::class, 'projects']);
Route::get('/sitemap-properties.xml', [SitemapXMLController::class, 'properties']);
Route::get('/sitemap-communities.xml', [SitemapXMLController::class, 'communities']);
Route::get('/sitemap-developers.xml', [SitemapXMLController::class, 'developers']);
Route::get('/sitemap-static.xml', [SitemapXMLController::class, 'staticPages']);


require __DIR__.'/file.web.php';
