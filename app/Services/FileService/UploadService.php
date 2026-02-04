<?php

namespace App\Services\FileService;

use App\Models\File;
use Carbon\Carbon;
use App\Facades\FileService\FileService;


class UploadService
{
    public function mapFileModel(File $file)
    {
        return [
            'id' => $file->id,
            'name' => $file->name,
            'description' => $file->description,
            'url' => $file->url,
            'order' => $file->order,
            'isActive' => (bool) $file->is_active,
            'createdAt' => Carbon::make($file->created_at)->format('M d,Y'),
        ];
    }

    private function fillFileForm(File &$file, $data, $reference = null, $id = -1, $order) {
        if (array_key_exists('name', $data)) $name = $data['name'];
        else $name = '';

        if (array_key_exists('description', $data)) $desc = $data['description'];
        else $desc = '';

        if (array_key_exists('isActive', $data)) {
            $isActive = $data['isActive'] === 'true';
        } else $isActive = true;
        $file->fill([
            'name' => $name,
            'description' => $desc,
            'is_active' => $isActive,
            'order' => $order,
        ]);
        if ($id > 0) {
            $file['reference_id'] = $id;
        }

        if (!is_null($reference)) {
            $file['reference_type'] = $reference;
        }
        if (array_key_exists('url', $data)) {
            $file['url'] = $data['url'];
        }
    }

    public function saveFile($data, $url = 'url', $container = 'uploads') {
//        $data = request()->all();
        $file = new File();
        $file->fill([
            'name' => array_key_exists('name', $data) ? $data['name'] : '',
            'description' => array_key_exists('description', $data) ? $data['description'] : '',
            'is_active' => array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1,
            'order' => array_key_exists('order', $data) ? $data['order'] : 0,
            'reference_id' => $data['refId'],
            'reference_type' => $data['refType'],
            'is_cover' => array_key_exists('isCover', $data) ? $data['isCover'] === 'true' : 0,
            'is_image' => array_key_exists('isImage', $data) ? $data['isImage'] === 'true' : 1,
        ]);
//        $file->url = FileService::storeFile($data, 'url', 'uploads');
        $file->url = FileService::storeFile($data, $url, $container);
        $file->save();
        return $this->mapFileModel($file);
    }

    public function storeFile($data, $reference, $id, $order = 0)
    {
        $file = new File();
        $this->fillFileForm($file, $data, $reference, $id, $order);
        if (!is_null($data['url'])) {
            $file->url = FileService::storeFile($data, 'url', 'uploads');
        }

        $file->save();
        return $this->mapFileModel($file);
    }

    public function updateFile($id, $url = 'url', $container = 'uploads')
    {
        $data = request()->all();
        $file = File::query()->where('id', $id)->first();
        if (array_key_exists($url, $data)) {
//            $fileName = $file['url'];
//            $file->url = FileService::storeFile($data, 'url', 'uploads');
//            FileService::deleteFile($fileName, 'uploads');
            $this->uploadFile($id, $url, $container);
        }
        $this->fillFileForm($file, $data, $file->reference_type, $file->reference_id, $file->order);
        $file->update();
        $file = File::query()->where('id', $id)->first();
        return $this->mapFileModel($file);
    }

    public function uploadFile($id, $url = 'url', $container = 'uploads') {
        $data = request()->all();
//        dd($data);
        $file = File::query()->where('id', $id)->first();
        $fileName = $file['url'];
        $file->url = FileService::storeFile($data, $url, $container);
        FileService::deleteFile($fileName, $container);
        $file->update();
        return $this->mapFileModel($file);
    }

    public function deleteFile(int $id, string $container = 'uploads'): void
    {
        $file = File::query()->where('id', $id)->first();
        FileService::deleteFile($file->url, $container);
        $file->delete();
    }

    public function fileActivation($data, $id)
    {
        $f = File::query()->where('id', $id)->first();
        $f->is_active = $data['isActive'] === 'true';
        $f->update();
        return $this->mapFileModel($f);
    }

    public function reorder($data) {
        $filesModel = [];
        $files = json_decode($data['files']);
        foreach ($files as $file) {
            $f = File::query()->where('id', $file['id'])->first();
            $f->order = $file['order'];
            $f->update();
            $filesModel[] = $this->mapFileModel($f);
            return $filesModel;
        }
    }
}
