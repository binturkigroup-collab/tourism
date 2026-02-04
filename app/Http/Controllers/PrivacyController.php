<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PrivacyController extends Controller
{
    public function index() {
        $privacy = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::PRIVACY->value));
        return Inertia::render('Site/Privacy/Privacy', [
            'privacy' => $privacy,
        ]);
    }
}
