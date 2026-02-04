<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RentController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('Site/Rent/Rent', []);
    }
}
