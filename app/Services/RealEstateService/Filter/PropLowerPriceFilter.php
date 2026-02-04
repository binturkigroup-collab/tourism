<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class PropLowerPriceFilter extends Filter
{

    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('minPrice')) {
            $lowerPrice = request()->get('minPrice');
            return $builder->where('price',  '>=', $lowerPrice);
        }
        else return $builder;
    }
}
