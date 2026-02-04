<?php

namespace App\Services\WebsiteService;

use Illuminate\Support\Facades\URL;

class LanguageService
{
    public function getLanguage(): string
    {
        $terms = explode('/', URL::getRequest()->path());
        return $terms[0] === '' ? app()->getLocale() : $terms[0];
    }
}
