<?php

namespace App\Http\Controllers\Site;

use App\Enums\BlockCategoryEnum;
use App\Facades\RealEstateService\CommunityService;
use App\Facades\RealEstateService\DeveloperService;
use App\Facades\RealEstateService\ProjectService;
use App\Facades\RealEstateService\PropertyService;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\Project;
use App\Models\Property;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Types\This;

class SitemapXMLController extends Controller
{
    public function index(): Response
    {
        $sitemaps = [
            url('sitemap-trips.xml'),
            url('sitemap-packages.xml'),
            url('sitemap-blogs.xml'),
            url('sitemap-static.xml'),
        ];

        return response()->view('sitemap.index', compact('sitemaps'))
            ->header('Content-Type', 'application/xml');

//        return view('sitemap.sitemapXML', []);
    }

//    public function properties(): Response
//    {
//        $items = Property::with(['block.translations'])
//            ->get()
//            ->map(fn ($p) => [
//                'urls'     => $this->localizedUrls('properties.show', $p->block),
//                'lastmod'  => $this->lastmod($p, $p->block),
//            ]);
//
//        return $this->xmlResponse('sitemap.items', compact('items'));
//    }


//    public function projects(): Response
//    {
//        $items = Project::with(['block.translations'])
//            ->get()
//            ->map(fn ($p) => [
//                'urls'     => $this->localizedUrls('projects.show', $p->block),
//                'lastmod'  => $this->lastmod($p, $p->block),
//            ]);
//
////        return response()->view('sitemap.items', compact('items'))
////            ->header('Content-Type', 'application/xml');
//
//        return $this->xmlResponse('sitemap.items', compact('items'));
//    }

//    public function developers(): Response
//    {
//        $items = Block::where('category', Str::slug(BlockCategoryEnum::DEVELOPERS->value))
//            ->with('translations')
//            ->get()
//            ->map(fn ($b) => [
//                'urls'     => $this->localizedUrls('developers.show', $b),
//                'lastmod'  => $b->updated_at->toAtomString(),
//            ]);
//
//        return $this->xmlResponse('sitemap.items', compact('items'));
//    }

//    public function communities(): Response
//    {
//        $items = Block::where('category', Str::slug(BlockCategoryEnum::COMMUNITIES->value))
//            ->with('translations')
//            ->get()
//            ->map(fn ($b) => [
//                'urls'     => $this->commUrls('properties', $b),
//                'lastmod'  => $b->updated_at->toAtomString(),
//            ]);
//
//        return $this->xmlResponse('sitemap.items', compact('items'));
//    }

    public function blogs(): Response
    {
        $items = Block::where('category', Str::slug(BlockCategoryEnum::BLOG->value))
            ->with('translations')
            ->get()
            ->map(fn ($b) => [
                'urls'     => $this->blogUrls('blogs.show', $b),
                'lastmod'  => $b->updated_at->toAtomString(),
            ]);

        return $this->xmlResponse('sitemap.items', compact('items'));
    }

    public function trips(): Response
    {
        $items = Block::where('category', Str::slug(BlockCategoryEnum::TRIP->value))
            ->with(['translations', 'trip'])
            ->whereHas('trip', function ($query) {
                $query->whereNull('package');
            })
            ->get()
            ->map(fn ($b) => [
                'urls'     => $this->tripUrls('trips.show', $b),
                'lastmod'  => $b->updated_at->toAtomString(),
            ]);

        return $this->xmlResponse('sitemap.items', compact('items'));
    }

    public function packages(): Response
    {
        $items = Block::where('category', Str::slug(BlockCategoryEnum::TRIP->value))
            ->with(['translations', 'trip'])
            ->whereHas('trip', function ($query) {
                $query->whereNotNull('package');
            })
            ->get()
            ->map(fn ($b) => [
                'urls'     => $this->tripUrls('packages.show', $b),
                'lastmod'  => $b->updated_at->toAtomString(),
            ]);

        return $this->xmlResponse('sitemap.items', compact('items'));
    }

    public function staticPages(): Response
    {
        $items = [
            'home' => [
                'urls'     => $this->staticUrls('home'),
            ],
            'about' => [
                'urls'     => $this->staticUrls('about-us'),
//                'lastmod'  => $about->updated_at->toAtomString(),
            ],

            'contact' => [
                'urls'     => $this->staticUrls('contact-us'),
//                'lastmod'  => $contact->updated_at->toAtomString(),
            ],

            'career' => [
                'urls'     => $this->staticUrls('careers'),
//                'lastmod'  => $career->updated_at->toAtomString(),
            ],

            'conditions' => [
                'urls'     => $this->staticUrls('conditions-and-terms'),
//                'lastmod'  => $conditions->updated_at->toAtomString(),
            ],

            'privacy' => [
                'urls'     => $this->staticUrls('privacy-policy'),
//                'lastmod'  => $privacy->updated_at->toAtomString(),
            ],

            'trips' => [
                'urls'     => $this->staticUrls('trips'),
            ],

            'packages' => [
                'urls'     => $this->staticUrls('packages'),
            ],

            'blogs' => [
                'urls'     => $this->staticUrls('blogs'),
            ],

            'calendar' => [
                'urls'     => $this->staticUrls('calendar'),
            ]
        ];

        return $this->xmlResponse('sitemap.static', compact('items'));

    }

    // -----------------------------------------
    // Helpers

    private function lastmod(...$models)
    {
        return collect($models)
            ->map(fn ($m) => $m->updated_at)
            ->filter()
            ->max()
            ->toAtomString();
    }
    private function localizedUrls($routeName, $block)
    {
        return collect(languages())->map(function($lang) use ($routeName, $block) {
            $translation = $block->translations->where('language', $lang)->first();
            if (!$translation) return null;

//            dd( route($routeName, ['slug' => $translation->slug]) );
            return [
                'lang' => $lang,
                'url'  => route($routeName, ['locale' => $lang, 'slug' => $translation->slug]),
            ];
        })->filter()->values();
    }

    private function tripUrls($routeName, $block)
    {
        return collect(languages())->map(function($lang) use ($routeName, $block) {
            $translation = $block->translations->where('language', $lang)->first();
            if (!$translation) return null;

            return [
                'lang' => $lang,
                'url'  => route($routeName, ['locale' => $lang,  'trip' => $translation->slug]),
            ];
        })->filter()->values();
    }

    private function blogUrls($routeName, $block)
    {
        return collect(languages())->map(function($lang) use ($routeName, $block) {
            $translation = $block->translations->where('language', $lang)->first();
            if (!$translation) return null;

            return [
                'lang' => $lang,
                'url'  => route($routeName, ['locale' => $lang,  'slug' => $translation->slug]),
            ];
        })->filter()->values();
    }

    private function staticUrls($routeName): Collection
    {
        return collect(languages())->map(function($lang) use ($routeName) {
            return [
                'lang' => $lang,
                'url'  => route($routeName, ['locale' => $lang]),
            ];
        })->filter()->values();
    }

    private function xmlResponse($view, $data): Response
    {
        return response()->view($view, $data)
            ->header('Content-Type', 'application/xml');
    }

}
