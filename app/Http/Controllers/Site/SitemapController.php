<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\CommunityService;
use App\Facades\RealEstateService\DeveloperService;
use App\Facades\RealEstateService\ProjectService;
use App\Facades\RealEstateService\PropertyService;
use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Support\Str;

class SitemapController extends Controller
{
    public function html(): View|Application|Factory
    {
        $developers = DeveloperService::getActiveBlocks(Str::slug(BlockCategoryEnum::DEVELOPERS->value, '-'));
        $communities = CommunityService::getActiveBlocks(Str::slug(BlockCategoryEnum::COMMUNITIES->value, '-'));
        $projects = ProjectService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROJECT->value, '-'));
        $properties = PropertyService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROPERTY->value, '-'));
//        return view('sitemap.html', [
//            'developers' => Developer::select('slug', 'name')->get(),
//            'communities' => Community::select('slug', 'name')->get(),
//            'projects' => Project::select('slug', 'name')->get(),
//            'properties' => Property::select('slug', 'title')->get(),
//        ]);
        return view('sitemap.html', [
            'developers' => $developers,
            'communities' => $communities,
            'projects' => $projects,
            'properties' => $properties,
        ]);
    }
}
