<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\WebsiteService\BlockService;
use App\Http\Controllers\Controller;
use App\Models\BlockTranslation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        request()->merge(['category' => Str::slug(BlockCategoryEnum::BLOG->value)]);
        $blogs = BlockService::getActiveBlocks(Str::slug(BlockCategoryEnum::BLOG->value, '-'));
        return Inertia::render('Site/Blogs/BlogsList', [
            'blogs' => $blogs,
            'seo' => [
                'title' => 'Blogs',
                'description' => 'Blogs for Prestige Palace Property - PPP',
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $slug)
            ->firstOrFail();
        $block = $translation->block;

        $blog = BlockService::mapLocaleBlock($block);

        return Inertia::render('Site/Blogs/BlogDetails', [
            'blog' => $blog,
            'seo' => [
                'title' => $translation->name,
                'description' => $translation->description,
                'schema' => json_encode(BlockService::getSchema($block)), // returns JSON-LD
            ],
        ]);
    }
}
