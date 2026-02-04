<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class CityFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('cityId')) {
            $cityId = request()->get('cityId');
            return $builder->where('city_id', $cityId);
        }
        else return $builder;
    }
}
