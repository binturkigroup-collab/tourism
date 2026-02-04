<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class SearchFilter extends Filter
{

    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('search')) {
            $search = request()->get('search');
            return $builder->where('name',  'LIKE', "%{$search}%");
        }
        else return $builder;
    }
}
