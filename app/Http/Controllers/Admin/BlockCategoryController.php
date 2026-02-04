<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Modules\Website\Facades\Blocks\BlockCategoryService;
use Symfony\Component\HttpFoundation\Response;

class BlockCategoryController extends Controller
{
    public function index()
    {
        return response()->json(BlockCategoryService::getBlockCategories());
    }

    public function create() {}

    public function store()
    {
        try {
            $blockCategoryModel = BlockCategoryService::storeBlockCategory();
            return response()->json([
                'status' => 'success',
                'message' => 'A new block category has been Added Successfully',
                'category' => $blockCategoryModel,
            ]);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show() {}

    public function edit() {}

    public function update($id) {
        try {
            $blockCategoryModel = BlockCategoryService::updateBlockCategory($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Block category has been updated Successfully',
                'category' => $blockCategoryModel,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id) {
        try {
            BlockCategoryService::deleteBlockCategory($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Block category has been deleted Successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
