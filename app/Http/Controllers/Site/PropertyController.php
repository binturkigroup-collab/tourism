<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\CommunityService;
use App\Facades\RealEstateService\DeveloperService;
use App\Facades\RealEstateService\PropertyService;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\BlockTranslation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        $properties = PropertyService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROPERTY->value, '-'));
        $developers = DeveloperService::getActiveBlocks(Str::slug(BlockCategoryEnum::DEVELOPERS->value, '-'));
        $communities = CommunityService::getActiveBlocks(Str::slug(BlockCategoryEnum::COMMUNITIES->value, '-'));
        $cities = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::CITY->value, '-'));
        return Inertia::render('Site/Properties/Properties', [
            'properties' => $properties,
            'developers' => $developers,
            'communities' => $communities,
            'cities' => $cities,
            'seo' => [
                'title' => 'Properties',
                'description' => 'Luxury Properties for sell, buy, or rent presented by Prestige Palace in Dubai',
//                'schema' => json_encode(ProjectService::getSchema()), // returns JSON-LD
            ],
        ]);
    }

    public function show(string $slug) {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $slug)
            ->firstOrFail();
        $block = $translation->block;
        $property = PropertyService::mapLocaleBlock($block);
        return Inertia::render('Site/Properties/PropertyDetails', [
            'property' => $property,
            'seo' => [
                'title' => $translation->name,
                'description' => $translation->description,
                'schema' => json_encode(PropertyService::getSchema($block)), // returns JSON-LD
            ],
        ]);
    }

    public function filter(): JsonResponse
    {
        $properties = PropertyService::getActiveBlocks(Str::slug(BlockCategoryEnum::PROPERTY->value, '-'));
        return response()-> json($properties);
    }
}
