<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use App\Facades\SettingService\LanguageService;
use Symfony\Component\HttpFoundation\Response;

class Language
{
    public function handle(Request $request, Closure $next): Response
    {
//        dd(app()->getLocale());
//            =================================================
//            This line is used to avoid route model binding from using {locale} variable:
//              EX:
//              {locale}/category/{category}
//              Without this line, route model variable will read {category} as {locale}
//              With this line, {locale will be dropped from route model binding!}
//            =================================================
        if ($request->route()->hasParameter('locale')) {
            $request->route()->forgetParameter('locale');
        }
//            =================================================

        $terms = explode('/', URL::getRequest()->path());
        if (!in_array($terms[0], config('app.available_locales'))) {
            return redirect(app()->getLocale() . '/' . URL::getRequest()->path());
        } else {
            Cookie::forget('locale');
            Cookie::queue(Cookie::make('locale', $terms[0], 60));
            app()->setLocale($terms[0]);
        }

//        dd(app()->getLocale());
//        dd($terms);

//        dd(URL::getRequest()->path());
        $languages = LanguageService::getActiveLanguages();
//        $locale = $request->route('locale')??config('app.fallback_locale');
//        app()->setLocale($locale);
        Inertia::share('lang', app()->getLocale());
        Inertia::share('languages', $languages);
        URL::defaults(['locale' => app()->getLocale()]);
        return $next($request);
    }
}
