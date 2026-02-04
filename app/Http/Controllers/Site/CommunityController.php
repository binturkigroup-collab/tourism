<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CommunityController extends Controller
{
    public function index(): Response
    {
        request()->merge(['category' => Str::slug(BlockCategoryEnum::COMMUNITIES->value)]);
        $communities = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::COMMUNITIES->value, '-'));
        return Inertia::render('Site/Communities/Communities', [
            'communities' => $communities,
            'seo' => [
                'title' => 'Communities',
                'description' => 'Communities for Living in Dubai',
            ],
        ]);
    }
}
