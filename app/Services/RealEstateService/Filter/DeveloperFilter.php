<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class DeveloperFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('developerId')) {
            $developerId = request()->get('developerId');
            return $builder->where('developer_id', $developerId);
        }
        else return $builder;
    }
}
