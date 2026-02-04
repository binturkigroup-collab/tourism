<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class ProjLowerPriceFilter extends Filter
{

    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('minPrice')) {
            $lowerPrice = request()->get('minPrice');
            return $builder->where('lunch_price',  '>=', $lowerPrice);
        }
        else return $builder;
    }
}
