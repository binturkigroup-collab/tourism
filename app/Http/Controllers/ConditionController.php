<?php

namespace App\Http\Controllers;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConditionController extends Controller
{
    public function index() {
        $conditions = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::CONDITION->value));
        return Inertia::render('Site/Conditions/Conditions', [
            'conditions' => $conditions,
        ]);
    }
}
