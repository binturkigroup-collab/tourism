<?php

namespace App\Services\RealEstateService\Filter;

use App\Models\BlockTranslation;
use Illuminate\Database\Eloquent\Builder;

class CommunitySlugFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args): Builder
    {
        if (request()->has('communitySlug') && request()->get('communitySlug') !== '') {
            $translation = BlockTranslation::where('language', app()->getLocale())
                ->where('slug', request()->get('communitySlug'))
                ->firstOrFail();
            $communityId = $translation->block_id;
            return $builder->where('community_id', $communityId);
        }
        else return $builder;
    }
}
