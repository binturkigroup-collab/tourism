<?php

namespace App\Services\RealEstateService\Filter;

use Closure;
use Illuminate\Database\Eloquent\Builder;

abstract class Filter
{
    public function handle($request, Closure $next, ...$args){
        $builder = $next($request);
        return $this->applyFilter($builder, $args);
    }

    protected abstract function applyFilter(Builder $builder, ...$args);
}
