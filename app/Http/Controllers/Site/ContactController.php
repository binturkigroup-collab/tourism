<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index() {
        return Inertia::render('Site/Contact/Contact', [
            'seo' => [
                'title' => 'Contact Us',
                'description' => 'Get in touch with Prestige Palace Property',
            ],
        ]);
    }
}
