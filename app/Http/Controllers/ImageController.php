<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class ImageController extends Controller
{
    private string $default_image;

    public function __construct()
    {
        $this->default_image = 'logo.png';
    }

    private function index($container, $img_name, $default): ?string
    {
        if (Storage::disk('public')->exists($container . '/' . $img_name)){
            $img = Storage::disk('public')->get($container . '/' . $img_name);
        }
        else{
            $img = Storage::disk('public')->get($container . '/' . $default);
        }

        return $img;
    }

    public function getBlockImg($img_name): ?string
    {
        return $this->index('block', $img_name, $this->default_image);
    }

    public function getProjectImg($img_name): ?string
    {
        return $this->index('project', $img_name, $this->default_image);
    }

    public function getPropertyImg($img_name): ?string
    {
        return $this->index('property', $img_name, $this->default_image);
    }

    public function getLogoImg(): ?string
    {
        return $this->index('logo', 'null', $this->default_image);
    }

    public function getUserImg($img_name): ?string
    {
        return $this->index('users', $img_name, $this->default_image);
    }

    public function getUploadImg($img_name): ?string
    {
        return $this->index('uploads', $img_name, $this->default_image);
    }


    public function getDefaultImg($img_name): ?string
    {
        return $this->index('defaults', $img_name, $this->default_image);
    }

    public function getCategoryImg($img_name): ?string
    {
        return $this->index('category', $img_name, $this->default_image);
    }

    public function getProductImg($img_name): ?string
    {
        return $this->index('product', $img_name, $this->default_image);
    }

    public function getMenuFile($file_name): ?string
    {
        return $this->index('menu', $file_name, $this->default_image);
    }

    public function getProjectFile($file_name): BinaryFileResponse
    {
        return response()->download(
            storage_path('app/public/project/' . $file_name),
            $file_name,
            [
                'Content-Type' => 'application/pdf',
            ]
        );
    }

    public function getPropertyFile($file_name): BinaryFileResponse
    {
        return response()->download(
            storage_path('app/public/property/' . $file_name),
            $file_name,
            [
                'Content-Type' => 'application/pdf',
            ]
        );
    }

}
