<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index(): \Inertia\Response
    {
        $story = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::OUR_STORY->value));
        $mission = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::OUR_MISSION->value));
        $vision = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::OUR_VISION->value));
        $directors = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::OUR_BOARD_OF_DIRECTORS->value, '-'));
        return Inertia::render('Site/About/About', [
            'story' => $story,
            'mission' => $mission,
            'vision' => $vision,
            'directors' => $directors,
            'seo' => [
                'title' => 'About Us',
                'description' => 'About Prestige Palace Property',
            ],
        ]);
    }
}
