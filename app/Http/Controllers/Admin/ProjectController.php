<?php

namespace App\Http\Controllers\Admin;

use App\Facades\RealEstateService\ProjectService;
use App\Http\Controllers\Controller;
use App\Models\Block;
use App\Models\Project;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    public function deleteImage(Request $request, Block $block): JsonResponse
    {
        try {
            $data = $request->all();
            return \response()->json(ProjectService::deleteImage($data, $block));
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while deleting project image',
                'details' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
