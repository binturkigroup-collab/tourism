<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\CommunityService;
use App\Facades\RealEstateService\DeveloperService;
use App\Facades\RealEstateService\ProjectService;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\BlockTranslation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        $projects = ProjectService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROJECT->value, '-'));
        $developers = DeveloperService::getActiveBlocks(Str::slug(BlockCategoryEnum::DEVELOPERS->value, '-'));
        $communities = CommunityService::getActiveBlocks(Str::slug(BlockCategoryEnum::COMMUNITIES->value, '-'));
        $cities = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::CITY->value, '-'));
        return Inertia::render('Site/Projects/Projects', [
            'projects' => $projects,
            'developers' => $developers,
            'communities' => $communities,
            'cities' => $cities,
            'seo' => [
                'title' => 'Projects',
                'description' => 'Projects for offices, Apartment, Villas, or Floor established by pioneered developers in Dubai',
//                'schema' => json_encode(ProjectService::getSchema()), // returns JSON-LD
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $slug)
            ->firstOrFail();
        $block = $translation->block;
//        $block = BlockService::getBlockBySlug($slug);

        $project = ProjectService::mapLocaleBlock($block);

        $developer = BlockService::mapLocaleBlock(Block::query()->where('id', $project['developerId'])->first());

        return Inertia::render('Site/Projects/ProjectDetails', [
            'project' => $project,
            'developer' => $developer,
            'seo' => [
                'title' => $translation->name,
                'description' => $translation->description,
                'schema' => json_encode(ProjectService::getSchema($block)), // returns JSON-LD
            ],
        ]);
    }

    public function filter(): JsonResponse
    {
        $projects = ProjectService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROJECT->value, '-'));
        return response()-> json($projects);
    }
}
