<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class ProjHigherPriceFilter extends Filter
{

    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('maxPrice')) {
            $higherPrice = request()->get('maxPrice');
            return $builder->where('lunch_price',  '<=', $higherPrice);
        }
        else return $builder;
    }
}
