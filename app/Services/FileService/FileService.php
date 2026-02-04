<?php

namespace App\Services\FileService;

use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function mapFileModel(File $file) {
        return [
            'id' => $file->id,
            'name' => $file->name,
            'description' => $file->description,
            'url' => $file->url,
            'order' => $file->order,
            'isActive' => $file->is_active,
            'isCover' => $file->is_cover,
            'isImage' => $file->is_image,
        ];
    }
    public function storeFile(&$data, $property, $container): ?string
    {
        if ($data[$property] === 'null') return null;
        $imageName = $container . "-" . uniqid() . '.' . $data[$property]->getClientOriginalExtension();
        Storage::disk('public')->putFileAs($container, $data[$property], $imageName);
        $data[$property] = $imageName;
        return $imageName;
    }

    public function deleteFile($fileName, $container){
        Storage::disk('public')->delete($container . '/' . $fileName);
    }
}
