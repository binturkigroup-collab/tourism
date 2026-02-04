<?php

namespace App\Http\Controllers\Admin;
use App\Facades\WebsiteService\BlockService;
use App\Models\Block;
use Exception;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class BlockController extends Controller
{
    public function __construct()
    {
    }

    public function index(): JsonResponse
    {
        return response()->json(BlockService::getBlocks());
    }
    public function create(string $category): \Inertia\Response
    {
        return Inertia::render('Admin/Website/Blocks/Partials/BlockAdd', [
            'category' => $category,
        ]);
    }

    public function getBlocks($category): \Inertia\Response
    {
        $blocks = BlockService::getBlocksByCategory($category);
        return Inertia::render('Admin/Website/Blocks/BlockContainer', [
            'blocks' => $blocks,
            'category' => $category,
        ]);
    }

    public function getActiveBlocks(string $category): JsonResponse
    {
        request()->merge(['category' => Str::slug($category)]);
        return \response()->json(BlockService::getActiveBlocksForAdmin($category));
    }

    public function store(): JsonResponse
    {
        $data = \request()->all();
        try {
            $blockModel = BlockService::storeBlock($data);
            return response()->json([
                'status' => 'success',
                'message' => 'Block Store Added Successfully',
                'block' => $blockModel,
            ]);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function show($id) {}
    public function edit(Block $block): \Inertia\Response
    {
        \request()->merge(['category' => $block->category]);
        $blockModel = BlockService::mapBlockModel($block);
        return Inertia::render('Admin/Website/Blocks/Partials/BlockUpdate', [
            'block' => $blockModel,
            'category' => $block->category,
        ]);
    }
    public function update($id): JsonResponse
    {
        try {
            $blockModel = BlockService::updateBlock($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Block Store Updated Successfully',
                'block' => $blockModel,
            ]);

        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function destroy(Block $block): JsonResponse
    {
        try {
            BlockService::deleteBlock($block);
            return response()->json([
                'status' => 'success',
                'message' => 'Block Store Deleted Successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function uploadFile(Request $request, Block $block): JsonResponse
    {
        try {
            $data = $request->all();
            $block = BlockService::updateImage($data, $block);
            return \response()->json($block);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function blockActivation(Request $request, Block $block): JsonResponse
    {
        $data = $request->all();
        try {
            $block = BlockService::blockActivation($data, $block);
            return \response()->json($block);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update_general_info($id): JsonResponse
    {
        try {
            $block = BlockService::update_general_info($id);
            return response()->json([
                'status' => 'success',
                'message' => 'General Info updated Successfully!',
                'block' => $block,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update_description_info($id): JsonResponse
    {
        try {
            $block = BlockService::update_description_info($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Block Description updated Successfully!',
                'block' => $block,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateTranslation(Request $request, Block $block): JsonResponse
    {
        $data = $request->all();
        try {
            $request->merge(['category' => $block->category]);
            $block = BlockService::mapBlockModel(BlockService::updateTranslations($data, $block));
            return \response()->json($block);
//            return response()->json([
//                'status' => 'success',
//                'message' => 'Block Translation updated Successfully!',
//                'block' => $block,
//            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function addImage(Request $request, Block $block): JsonResponse
    {
        try {
            $data = $request->all();
            return \response()->json(BlockService::saveImage($data, $block));
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while adding product image',
                'details' => $exception->getMessage(),
            ], \Symfony\Component\HttpFoundation\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteImage(Request $request, Block $block): JsonResponse
    {
        try {
            $data = $request->all();
            return \response()->json(BlockService::deleteImage($data, $block));
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while deleting product image',
                'details' => $exception->getMessage(),
            ], \Symfony\Component\HttpFoundation\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function reorder($category) {
        $blocks = BlockService::getBlocksByCategory($category);
        return Inertia::render('Admin/Website/Blocks/Partials/BlockReorder', [
            'blocks' => $blocks,
            'category' => $category,
        ]);
    }

    /*
     *
     */

    public function storeReorder(Request $request): JsonResponse
    {
        $data = $request->all();
        try {
            BlockService::reorderList($data);
            return \response()->json([
                'status' => 'success',
                'message' => 'List has been ordered!',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while reordering list',
                'details' => $exception->getMessage(),
            ], \Symfony\Component\HttpFoundation\Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
