<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\ProjectService;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use App\Models\BlockTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DeveloperController extends Controller
{
    public function index(): Response
    {
        request()->merge(['category' => Str::slug(BlockCategoryEnum::DEVELOPERS->value)]);
        $developers = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::DEVELOPERS->value, '-'));
        return Inertia::render('Site/Developers/Developers', [
            'developers' => $developers,
            'seo' => [
                'title' => 'Developers',
                'description' => 'Developers for Living in Dubai',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $slug)
            ->firstOrFail();
        $block = $translation->block;
        $developer = BlockService::mapLocaleBlock($block);
        $rowProjects = $block->devProjects()->get();
        $projects = [];
        foreach ($rowProjects as $row) {
            $projects[] = ProjectService::mapLocaleBlock($row);
        }
        return Inertia::render('Site/Developers/DeveloperDetails', [
            'developer' => $developer,
            'projects' => $projects,
            'seo' => [
                'title' => $translation->name,
                'description' => $translation->description,
                'schema' => json_encode(BlockService::getSchema($block)), // returns JSON-LD
            ],
        ]);
    }
}
