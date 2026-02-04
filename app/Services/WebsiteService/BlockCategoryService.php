<?php

namespace App\Services\WebsiteService;

use Carbon\Carbon;
use JetBrains\PhpStorm\ArrayShape;
use Modules\Website\Entities\BlockCategory;

class BlockCategoryService
{
    public function mapBlockCategoryModel(BlockCategory $category)
    {
        return [
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
            'blockType' => $category->block_type,
            'isActive' => (bool)$category->is_active,
            'createdAt' => Carbon::make($category->created_at)->format('M d, Y'),
        ];
    }

    public function getBlockCategories()
    {
        $blockCategoryModel = [];
        $blockCategories = BlockCategory::query()->get();
        foreach ($blockCategories as $category) {
            $blockCategoryModel[] = $this->mapBlockCategoryModel($category);
        }
        return $blockCategoryModel;
    }

    public function getBlockByName($name) {
        return BlockCategory::where('name', $name)->first();
    }

    private function fillBlockCategoryForm(BlockCategory &$category) {
        $data = request()->all();
        $category->fill([
            'name' => $data['name'],
            'description' => $data['description'],
            'block_type' => $data['blockType'],
            'is_active' => $data['isActive'] === 'true',
        ]);
    }

    public function storeBlockCategory()
    {
        $blockCategory = new BlockCategory();
        $this->fillBlockCategoryForm($blockCategory);
        $blockCategory->save();
        return $this->mapBlockCategoryModel($blockCategory);
    }

    public function updateBlockCategory($id)
    {
        $blockCategory = BlockCategory::query()->where('id', $id)->first();
        $this->fillBlockCategoryForm($blockCategory);
        $blockCategory->update();
        return $this->mapBlockCategoryModel($blockCategory);
    }

    public function deleteBlockCategory($id) {
        $blockCategory = BlockCategory::query()->where('id', $id)->first();
        $blockCategory->delete();
    }
}
