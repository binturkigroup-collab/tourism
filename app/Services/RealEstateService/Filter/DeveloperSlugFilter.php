<?php

namespace App\Services\RealEstateService\Filter;

use App\Models\BlockTranslation;
use Illuminate\Database\Eloquent\Builder;

class DeveloperSlugFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args): Builder
    {
        if (request()->has('developerSlug') && request()->get('developerSlug') !== '') {
            $translation = BlockTranslation::where('language', app()->getLocale())
                ->where('slug', request()->get('developerSlug'))
                ->firstOrFail();
            $developerId = $translation->block_id;
            return $builder->where('developer_id', $developerId);
        }
        else return $builder;
    }
}
