<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class PropHigherPriceFilter extends Filter
{

    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('maxPrice')) {
            $higherPrice = request()->get('maxPrice');
            return $builder->where('price',  '<=', $higherPrice);
        }
        else return $builder;
    }
}
