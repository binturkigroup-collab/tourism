<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index() {
        $career = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::CAREER->value));
        return Inertia::render('Site/Careers/Careers', [
            'career' => $career,
        ]);
    }
}
