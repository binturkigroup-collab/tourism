<?php

namespace App\Services\WebsiteService;

use App\Facades\FileService\FileService;
use App\Facades\FileService\UploadService;
use App\Models\Block;
use App\Models\BlockTranslation;
use Carbon\Carbon;
use Illuminate\Support\Collection;

/**
 * @template T of Block
 */
class BlockService
{
    protected string $imageContainer;
    protected string $reference;

    public function __construct()
    {
        $this->imageContainer = 'block';
        $this->reference = 'App\Models\Block';
    }

    /**
     * @param T $block
     * @return array
     */
    public function mapBlockModel(Block $block): array
    {
        $translations = $block->translations;

        $images = $block->images()->get();

        $files = $block->files;
//        dd($files);
        $translationsModel = [];
        $filesModel = [];
        $imagesModel = [];
        foreach ($translations as $translation) {
            $translationsModel[] = $this->mapBlockTranslationModel($translation);
        }
        foreach ($files as $file) {
            $filesModel[] = UploadService::mapFileModel($file);
        }

        foreach ($images as $image) {
            $imagesModel[] = FileService::mapFileModel($image);
        }

        return [
            'id' => $block->id,
//            'categoryId' => $block->category->id,
            'category' => $block->category,
            'parentId' => $block->parent_id,
//            'name' => $block->name,
//            'description' => $block->description,
//            'image' => $block->image,
            'images' => $imagesModel,
            'url' => $block->url,
            'file' => $block->file,
            'order' => $block->order,
            'isActive' => (bool)$block->is_active,
            'startDate' => is_null($block->start_date) ? null : Carbon::make($block->start_date)->format('M d, Y'),
            'endDate' => is_null($block->end_date) ? null : Carbon::make($block->end_date)->format('M d, Y'),
            'createdAt' => Carbon::make($block->created_at)->format('M d, Y'),
            'translations' => $translationsModel,
            'files' => $filesModel,
        ];
    }

    public function getTranslation(Block $block): ?BlockTranslation
    {
        return BlockTranslation::query()
            ->where('block_id', $block->id)
            ->where('language', app()->getLocale())
            ->first();
    }

    public function getBlockBySlug(string $slug): ?Block
    {
        $translation = BlockTranslation::where('language', app()->getLocale())
            ->where('slug', $slug)
            ->firstOrFail();
        if (is_null($translation)) {return null; }
        return $translation->block;
    }

    public function getBlockName(Block $block): string {
        //TODO: conform URL for each block.
        $translation = BlockTranslation::query()
            ->where('block_id', $block->id)
            ->where('language', app()->getLocale())
            ->first();
        return $translation->name;
    }

    public function getBlockNameById(int $id): string
    {
        $block = Block::query()->findOrFail($id);
        if ($block) {
            return $this->getBlockName($block);
        }
        else return "";
    }

    public function relatedBlocks($block): Collection
    {
        $translation = BlockTranslation::query()
            ->where('block_id', $block->id)
            ->where('language', app()->getLocale())
            ->first();

        $images = $block->images()->get();
        dd($images);
        return collect($block, $translation, ...$images);
    }

    /**
     * @param T $block
     * @return array
     */
    public function mapLocaleBlock(Block $block): array
    {
        //TODO: conform URL for each block.
        $translation = BlockTranslation::query()
            ->where('block_id', $block->id)
            ->where('language', app()->getLocale())
            ->first();

        $images = $block->images()->get();


        $childrenModel = [];
        foreach ($block->children as $child) {
            $childrenModel[] = $this->mapLocaleBlock($child);
        }

        $imagesModel = [];
        foreach ($images as $image) {
            $imagesModel[] = FileService::mapFileModel($image);
        }

        return [
            'id' => $block->id,
            'lang' => $translation->language,
            'title' => $translation->name,
            'description' => $translation->description,
            'brief' => $translation->brief,
            'slug' => $translation->slug,
            'images' => $imagesModel,
            'file' => $block->file,
            'url' => '', //TO Be Conformed.
            'startDate' => is_null($block->start_date) ? null : Carbon::make($block->start_date)->format('M d, Y'),
            'endDate' => is_null($block->end_date) ? null : Carbon::make($block->end_date)->format('M d, Y'),
            'children' => $childrenModel,
        ];

    }

    public function mapBlockTranslationModel(BlockTranslation $translation)
    {
        return [
            'id' => $translation->id,
            'blockId' => $translation->block_id,
            'name' => $translation->name,
            'description' => $translation->description,
            'brief' => $translation->brief,
            'slug' => $translation->slug,
            'language' => $translation->language,
            'isActive' => $translation->is_active,
            'createdAt' => Carbon::make($translation->created_at)->format('M d, Y'),
        ];
    }

    public function getBlocks()
    {
        $blocksModel = [];
        $blocks = Block::query()->get();
        foreach ($blocks as $block) {
            $blocksModel[] = $this->mapBlockModel($block);
        }

        return $blocksModel;
    }

    public function getBlocksByCategory(string $category): array
    {
        $blocksModel = [];
        $blocks = Block::query()->where('category', $category)->orderBy('order', 'ASC')->get();
        foreach ($blocks as $block) {
            $blocksModel[] = $this->mapBlockModel($block);
        }

        return $blocksModel;
    }
    public function getActiveBlocksForAdmin($category): array
    {
        $blocks = Block::query()
            ->where('category', $category)
            ->where('is_active', 1)
            ->orderBy('order', 'ASC')
            ->orderBy('start_date', 'DESC')
            ->get();

        $blockModel = [];
        foreach ($blocks as $block) {
            $blockModel[] = $this->mapBlockModel($block);
        }

        return $blockModel;
    }

    protected function fillBlockForm(Block &$block) {
        $data = request()->all();
//        dd(json_decode($data['translations']));
        $block->fill([
//            'category_id' => $data['categoryId'],
            'category' => $data['category'],
            'parent_id' => $data['parentId'] === 'null' || $data['parentId'] === '-1' ? null : $data['parentId'],
//            'name' => $data['name'],
//            'description' => $data['description'],
            'is_active' => $data['isActive'] === 'true',
        ]);

//        if (array_key_exists('image', $data)) {
//            $block['image'] = FileService::storeFile($data, 'image', 'blocks');
//        }
        if (array_key_exists('file', $data)) {
            $block['file'] = FileService::storeFile($data, 'file', 'block');
        }

        if (array_key_exists('url', $data)) {
            $block['url'] = $data['url'];
        }

        if (array_key_exists('order', $data)) {
            $block['order'] = $data['order'];
        }

        if (array_key_exists('startDate', $data)) {
            $block['start_date'] = Carbon::make($data['startDate']);
        }

        if (array_key_exists('endDate', $data)) {
            $block['end_date'] = Carbon::make($data['endDate']);
        }
    }

    public function storeTranslations($data, Block $block) {
        if (array_key_exists('translations', $data)) {
            $translations = json_decode($data['translations']);
            foreach ($translations as $key => $translation) {
                $transForm = new BlockTranslation();
                $transForm->fill([
                    'block_id' => $block->id,
                    'name' => $translation->name,
                    'description' => $translation->description,
                    'brief' => $translation->brief ?? '',
                    'language' => $key,
                    'is_active' => array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1,
                ]);
                $transForm->save();
            }
        }
    }

    public function storeFiles($data, Block $block) {
        if (array_key_exists('files', $data)){
            foreach ($data['files'] as $key => $file) {
                $f['url'] = $file;
                UploadService::storeFile($f, 'App\Models\Block', $block->id, $key + 1);
            }
        }
    }

    public function storeBlock(array $data): array
    {
        $block = new Block();
//        $data = request()->all();
        $this->fillBlockForm($block);
        $block->save();
        //Store Translations:
        $this->storeTranslations($data, $block);
        //Store Files:
        //        2. Store File:
        if (array_key_exists('image', $data)) {
            $data['refId'] = $block->id;
            $data['refType'] = $this->reference;
            UploadService::saveFile($data, 'image', 'block');
        }
//        $this->storeFiles($data, $block);
        return $this->mapBlockModel($block);
    }


    public function updateBlock($id)
    {
        $block = Block::query()->where('id', $id)->first();
        $this->fillBlockForm($block);
        $block->update();
//        return $this->mapBlockModel(Block::hydrate($block));
        return $this->mapBlockModel($block);

    }

    public function updateImage(Array $data, Block $block): array
    {
//        $image = $block->images()->first();
        $image = $block->images()->where('id', $data['imageId'])->first();
        UploadService::updateFile($image->id, 'image', 'block');
        return $this->mapBlockModel($block);
    }

    public function upload_file($id) {
        $block = Block::query()->where('id', $id)->first();
        $data = request()->all();
        if (array_key_exists('image', $data)) {
            $fileName = $block['image'];
            $file = $block->image = FileService::storeFile($data, 'image', 'block');
        } else {
            $fileName = $block['file'];
            $file = $block->file = FileService::storeFile($data, 'file', 'block');
        }
        $block->update();
        FileService::deleteFile($fileName, 'block');
        return $file;
    }

    public function blockActivation($data, $block) {
        if (array_key_exists('isActive', $data)) {
            $translations = $block->translations()->get();
            foreach ($translations as $translation) {
                $translation->is_active = array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1;
                $translation->update();
            }
            $block->is_active = $data['isActive'] === 'true';
            $block->update();
        }

        return $this->mapBlockModel($block);
    }

    public function update_general_info($id) {
        $data = request()->all();
        $block = Block::query()->where('id', $id)->first();
        $block->category_id = $data['categoryId'];
        $block->parent_id = $data['parentId'] === null || $data['parentId'] === '-1' ? null : $data['parentId'];
        $block->start_date = Carbon::make($data['startDate']);
        $block->end_date = Carbon::make($data['endDate']);
//        $block->name = $data['name'];
        $block->update();
        return $this->mapBlockModel($block);
    }

    public function update_description_info($id) {
        $data = request()->all();
        $block = Block::query()->where('id', $id)->first();
        $block->description = $data['description'];
        $block->update();
        return $this->mapBlockModel($block);
    }

    private function fillTranslation(BlockTranslation $translation, Array $data, string $key, mixed $value): void
    {
//        dd($value->name);
        $translation->fill([
            'block_id' => $data['blockId'],
            'name' => $value->name,
            'description' => $value->description ?? '',
            'brief' => $value->brief ?? '',
            'language' => $key,
            'is_active' => array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1,
        ]);
    }

    public function updateTranslations(Array $data, Block $block) {
        //Store Date if existed:
        if (array_key_exists('startDate', $data)) {
            $block['start_date'] = Carbon::make($data['startDate']);
            $block->save();
        }

        if (array_key_exists('endDate', $data)) {
            $block['end_date'] = Carbon::make($data['endDate']);
            $block->save();
        }

        //Store parentID if existed:
        if (array_key_exists('parentId', $data)) {
            $block->parent_id = $data['parentId'];
            $block->update();
        }


        $receivedTranslations = json_decode($data['translations']);
//        dd($receivedTranslations);
        foreach ($receivedTranslations as $key => $value) {

            $translation = BlockTranslation::query()
                ->where('block_id', $block->id)
                ->where('language', $key)
                ->first();
            if (is_null($translation)) {
                $translation = new BlockTranslation();
                //Key Represent Language!.
                $this->fillTranslation($translation, $data, $key, $value);
                $translation->save();
            }
            $this->fillTranslation($translation, $data, $key, $value);
            $translation->update();
        }

//        return $this->mapBlockModel($block);
        return Block::query()->where('id', $block->id)->first();
    }

    public function deleteBlock(Block $block): void
    {
//        $block = Block::query()->where('id', $id)->first();
        if(!is_null($block->image)) {
            FileService::deleteFile($block->image, 'block');
        }

        if(!is_null($block->file)) {
            FileService::deleteFile($block->file, 'block');
        }

        foreach ($block->files as $file){
            UploadService::deleteFile($file->id);
        }

        $images = $block->images()->get();
        foreach ($images as $image) {
            UploadService::deleteFile($image->id, 'block');
        }

        $block->delete();
    }

    //Site Service:
    public function getActiveBlocks($category) {
//        $blocks = $category->blocks()
//            ->where('category', $category)
//            ->where('is_active', 1)
//            ->orderBy('order', 'ASC')
//            ->get();
        $blocks = Block::query()
            ->where('category', $category)
            ->where('is_active', 1)
            ->orderBy('order', 'ASC')
            ->orderBy('start_date', 'DESC')
            ->get();

        $blockModel = [];
        foreach ($blocks as $block) {
            $blockModel[] = $this->mapLocaleBlock($block);
        }

        return $blockModel;
    }

    // We need $data['image'], $data['isCover'].
    public function saveImage(Array $data, Block $block): array
    {
        $data['refId'] = $block->id;
        $data['refType'] = $this->reference;
        UploadService::saveFile($data, 'image', $this->imageContainer);
        return $this->mapBlockModel($block);
    }

//    //We need $data['imageId'], $data['image']
//    public function updateImage(Array $data, Product $product): array
//    {
//        $image = $product->images()->where('id', $data['imageId'])->first();
//        UploadService::updateFile($image->id, 'image', $this->imageContainer);
//        return $this->mapProductModel($product);
//    }

    //We need $data['imageId]
    public function deleteImage(Array $data, Block $block): array
    {
        UploadService::deleteFile($data['imageId'], $this->imageContainer);
        return $this->mapBlockModel($block);
    }

    public function reorderList(Array $data) {

        $list = json_decode($data['list']);
        foreach ($list as $item) {
            $block = Block::query()->where('id', $item->id)->first();
            $block->order = $item->order;
            $block->update();
        }
    }

    public function getSchema(Block $block): array
    {
        $translation = $this->getTranslation($block);
        $title = $translation->name ?? '';
        $description = $translation->description ?? '';
        $brief = $translation->brief ?? '';
        $locale = app()->getLocale(); // "en", "ar", etc.
        return $schema = [
            "@context" => "https://schema.org",
            "@type" => "Residence",
            "name" => $title,
            "description" => $description,
//            "image" => $this->images->pluck('url'),
            "image" =>  url('/file/blocks/' . $block->images()->first()->url),
//            "address" => [
//                "@type" => "PostalAddress",
//                "addressLocality" => $communityName,
//                "addressRegion" => "Dubai",
//                "addressCountry" => "UAE",
//            ],
//            "floorSize" => [
//                "@type" => "QuantitativeValue",
//                "value" => $this->size,
//                "unitCode" => "MTR",
//            ],
//            "numberOfRooms" => $this->bedrooms,
//            "numberOfBathroomsTotal" => $this->bathrooms,
//            "offers" => [
//                "@type" => "Offer",
//                "price" => $this->price,
//                "priceCurrency" => "AED",
//                "availability" => "https://schema.org/InStock",
//                "url" => route('properties.show', $this->slug),
//            ],
//            "breadcrumb" => [
//                "@type" => "BreadcrumbList",
//                "itemListElement" => [
//                    [
//                        "@type" => "ListItem",
//                        "position" => 1,
//                        "name" => $locale === 'ar' ? 'الرئيسية' : 'Home',
//                        "item" => url('/')
//                    ],
//                    [
//                        "@type" => "ListItem",
//                        "position" => 2,
//                        "name" => $locale === 'ar' ? 'العقارات' : 'Properties',
//                        "item" => route('properties.index')
//                    ],
//                    [
//                        "@type" => "ListItem",
//                        "position" => 3,
//                        "name" => $title,
//                        "item" => route('properties.show', $this->slug)
//                    ]
//                ]
//            ],
        ];
    }

    public function globalSchema(): array {
        return [
        ];
    }
}
