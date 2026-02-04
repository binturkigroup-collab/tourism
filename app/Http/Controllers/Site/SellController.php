<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SellController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Site/Sell/Sell', []);
    }
}
