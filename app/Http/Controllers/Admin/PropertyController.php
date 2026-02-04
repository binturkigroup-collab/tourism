<?php

namespace App\Http\Controllers\Admin;

use App\Facades\RealEstateService\PropertyService;
use App\Http\Controllers\Controller;
use App\Models\Property;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PropertyController extends Controller
{
    public function deleteImage(Request $request, Property $property): JsonResponse
    {
        try {
            $data = $request->all();
            return \response()->json(PropertyService::deleteImage($data, $property));
        } catch (Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error while deleting property image',
                'details' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
