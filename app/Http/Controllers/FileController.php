<?php

namespace App\Http\Controllers;

use App\Facades\FileService\UploadService;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Symfony\Component\HttpFoundation\Response;

class FileController extends Controller
{
    public function saveFile() {
        try {
            return \response()->json(UploadService::saveFile());
        }catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function updateFile($id) {
        try {
            $file = UploadService::updateFile($id);
            return \response()->json([
                'status' => 'success',
                'message' => 'File Group Updated Successfully',
                'file' => $file,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function uploadFile($id) {
        try {
            $file = UploadService::uploadFile($id);
            return \response()->json([
                'status' => 'success',
                'message' => 'File Group Updated Successfully',
                'file' => $file,
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteFile($id) {
        try {
            UploadService::deleteFile($id);
            return \response()->json([
                'status' => 'success',
                'message' => 'File Group Deleted Successfully',
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                'status' => 'error',
                'message' => $exception->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
