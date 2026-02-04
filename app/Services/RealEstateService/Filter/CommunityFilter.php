<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class CommunityFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('communityId')) {
            $communityId = request()->get('communityId');
            return $builder->where('community_id', $communityId);
        }
        else return $builder;
    }
}
