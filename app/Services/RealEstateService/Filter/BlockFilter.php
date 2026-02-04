<?php

namespace App\Services\RealEstateService\Filter;

use Illuminate\Database\Eloquent\Builder;

class BlockFilter extends Filter
{
    protected function applyFilter(Builder $builder, ...$args)
    {
        if (request()->has('blockId')) {
            $blockId = request()->get('blockId');
            return $builder->where('block_id', $blockId);
        }
        else return $builder;
    }
}
