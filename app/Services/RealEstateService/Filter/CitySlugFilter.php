<?php

namespace App\Services\RealEstateService\Filter;

use App\Models\BlockTranslation;
use Illuminate\Database\Eloquent\Builder;

class CitySlugFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args): Builder
    {
        if (request()->has('citySlug') && request()->get('citySlug') !== '') {
            $translation = BlockTranslation::where('language', app()->getLocale())
                ->where('slug', request()->get('citySlug'))
                ->firstOrFail();
            $cityId = $translation->block_id;
            return $builder->where('city_id', $cityId);
        }
        else return $builder;
    }
}
