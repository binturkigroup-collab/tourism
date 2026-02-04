<?php


namespace App\Services\WebsiteService;

use App\Enums\MenuTypeEnum;
use App\Facades\FileService\UploadService;
use App\Models\Menu;
use App\Models\MenuTranslation;
use Carbon\Carbon;
use Illuminate\Support\Str;
class MenuService
{
    private string $fileContainer;
    private string $reference;
    private string $file_url;

    public function __construct()
    {
        $this->fileContainer = 'menu';
        $this->reference = 'Modules\Website\Entities\Menu';
        $this->file_url = 'file/menus/';
    }
    public function mapMenuModel(Menu $menu) {
        $translations = $menu->translations;
        $translationsModel = [];
        foreach ($translations as $translation) {
            $translationsModel[] = $this->mapMenuTranslationModel($translation);
        }
        $fileModel = null;
        $file = $menu->file()->first();
        if (!is_null($file)) {
            $fileModel = UploadService::mapFileModel($file);
        }

        return [
            'id' => $menu->id,
            'parentId' => is_null($menu->parent_id) ? -1: $menu->parent_id,
            'category' => $menu->category,
            'name' => $menu->name,
            'order' => $menu->level_order,
            'url' => str_replace("tel:", "", $menu->url),
            'target' => $menu->target,
            'type' => $menu->type,
            'blockType' => $menu->block_type,
            'file' => $fileModel,
            'image' => $menu->image,
            'translations' => $translationsModel,
            'isActive' => $menu->is_active,
            'createdAt' => Carbon::make($menu->created_at)->format('M d, Y'),
        ];

    }

    public function mapLocaleMenu(Menu $menu): array
    {
//        dd(app()->getLocale());
        $translation = MenuTranslation::query()->
        where('menu_id', $menu->id)->
            //TODO: dedicate language according to the user choice on website:
        where('language', app()->getLocale())->
        first();
//        dd($translation);
        $childrenModel = [];
        foreach ($menu->children as $child) {
            $childrenModel[] = $this->mapLocaleMenu($child);
        }
        return [
            'masterName' => $menu->name,
            'name' => $translation->name,
            'url' => $menu->url,
            'slug' => $translation->slug,
            'target' => $menu->target,
            'children' => $childrenModel,
            'image' => $menu->image,
            'type' => $menu->type,
        ];
    }

    public function mapMenuTranslationModel(MenuTranslation $translation) {
        return [
            'id' => $translation->id,
            'menuId' => $translation->menu_id,
            'name' => $translation->name,
            'language' => $translation->language,
            'isActive' => $translation->is_active,
            'createdAt' => Carbon::make($translation->created_at)->format('M d, Y'),
        ];
    }

    public function storeFile($data, Menu $menu) {
        if (array_key_exists('file', $data)){
            $data['refId'] = $menu->id;
            $data['refType'] = $this->reference;
            return UploadService::saveFile($data, 'file', 'menu');
        } return null;
    }

    public function getMenus() {
        $menus = Menu::query()->get();
        $menusModel = [];
        foreach ($menus as $menu) {
            $menusModel[] = $this->mapMenuModel($menu);
        }
        return $menusModel;
    }

    public function getMenusByCategory(string $category): array
    {
        $blocksModel = [];
        $blocks = Menu::query()->where('category', $category)->orderBy('level_order', 'ASC')->get();
        foreach ($blocks as $block) {
            $blocksModel[] = $this->mapMenuModel($block);
        }

        return $blocksModel;
    }

    private function array_search_partial($arr, $keyword) {
        $result = false;
        foreach($arr as $index => $string) {
            if (strpos($string, $keyword) !== FALSE)
                $result = $index > 0;
        }
        return $result;
    }

    private function handleURL($data) {
        $value = null;
        $value = match ($data['type']) {
//            MenuTypeEnum::BLOCK->value => '/block/' . Str::slug($data['blockType'], '-'),
            MenuTypeEnum::BLOCK->value => '/' . Str::slug($data['blockType'], '-'),
            MenuTypeEnum::HOME->value => '/home',
            default => array_key_exists('url', $data) ? $data['url'] : null,
        };

        if ($data['type'] === 'Contact'){
            if (str_contains($data['image'], 'phon') || str_contains($data['image'], 'mobil')) {
                $value = 'tel:' . $data['url'];
            }

            if (str_contains($data['image'], 'mail')) {
                $value = 'mailto:' . $data['url'];
            }
        }

        return $value;
    }

    public function fillMenuForm(Menu &$menu) {
        $data = request()->all();
        $menu->fill([
            'parent_id' => $data['parentId'] === 'null' || $data['parentId'] === '-1' ? null : $data['parentId'],
            'category' => $data['category'],
            'name' => $data['name'],
            'level_order' => $data['order'],
            'target' => $data['target'],
            'is_active' => $data['isActive'] === 'true',
        ]);

        $menu['image'] = array_key_exists('image', $data) ? $data['image'] : null;
        $menu['type'] = array_key_exists('type', $data) ? $data['type'] : null;
        $menu['block_type'] = array_key_exists('blockType', $data) ? $data['blockType'] : null;

//        $menu['url'] = match ($data['type']) {
//            MenuTypeEnum::BLOCK->value => '/block/' . Str::slug($data['blockType'], '-'),
//            MenuTypeEnum::HOME->value => './',
//            MenuTypeEnum::PHONE->value => 'tel:' . $data['url'],
//            MenuTypeEnum::MOBILE->value => 'tel:' . $data['url'],
//            MenuTypeEnum::EMAIL->value => 'mailto:' . $data['url'],
//            default => array_key_exists('url', $data) ? $data['url'] : null,
//        };

        $menu['url'] = $this->handleURL($data);
    }

    public function storeMenuTranslations($data, Menu $menu) {
        if (array_key_exists('translations', $data)) {
            $translations = json_decode($data['translations']);
            foreach ($translations as $key => $translation) {
                $menuTranslation = new MenuTranslation();
                $menuTranslation->fill([
                    'menu_id' => $menu->id,
                    'name' => $translation->name,
                    'language' => $key,
                    'is_active' => $data['isActive'] === 'true',
                ]);
                $menuTranslation->save();
            }
        }
    }

    private function storeFileUrl(Menu $menu, $fileModelUrl = null): void
    {
        if (!is_null($fileModelUrl)) {
            $menu['url'] = $this->file_url . $fileModelUrl;
            $menu->update();
        }
    }

    public function storeMenu($data) {
        $menu = new Menu();
        $this->fillMenuForm($menu);
        $menu->save();
        $fileModel = $this->storeFile($data, $menu);
//        Store File URL if existed:
        $fileModelUrl = is_null($fileModel) ? null: $fileModel['url'];
        $this->storeFileUrl($menu, $fileModelUrl);
        $this->storeMenuTranslations($data, $menu);

        return $this->mapMenuModel($menu);
    }

    public function updateMenuTranslations($data, Menu $menu) {
        if (array_key_exists('translations', $data)) {
            $translations = json_decode($data['translations'], true);
            $translationEloquent = MenuTranslation::where('menu_id', $menu->id)->get();
            foreach ($translationEloquent as $key => $trans) {
//                dd($translations[$trans->language]['name']);
//                dd($trans->language);
                $trans->fill([
                    'name' => $translations[$trans->language]['name'],
                    'language' => $trans->language,
                    'is_active' => $data['isActive'] === 'true',
                ]);

                $trans->update();
            }
//            foreach ($translations as $translation) {
//                $menuTranslation = new MenuTranslation();
//                $menuTranslation->fill([
//                    'menu_id' => $menu->id,
//                    'name' => $translations[]->name,
//                    'language' => $translation->language,
//                ]);
//                $menuTranslation->save();
//            }
        }
    }

    public function updateMenu(array $data, Menu $menu) {
//        $data = request()->all();
//        dd('service: ', $menu, $data);
        $this->fillMenuForm($menu);
        $menu->update();
        $this->updateMenuTranslations($data, $menu);

        //Update file:
        if ($data['type'] !== 'File') {
            $file = $menu->file()->first();
            if(!is_null($file)) {
                UploadService::deleteFile($file->id, $this->fileContainer);
            }
        } else {
            $file = $menu->file()->first();
            $fileUrl = is_null($file) ? null : $file->url;
            $this->storeFileUrl($menu, $fileUrl);
        }

        return $this->mapMenuModel($menu);
    }

    public function menuActivation($data, $menu) {
        if (array_key_exists('isActive', $data)) {
            $translations = $menu->translations()->get();
            foreach ($translations as $translation) {
                $translation->is_active = array_key_exists('isActive', $data) ? $data['isActive'] === 'true' : 1;
                $translation->update();
            }
            $menu->is_active = $data['isActive'] === 'true';
            $menu->update();
        }

        return $this->mapMenuModel($menu);
    }

    public function updateFile(Array $data, Menu $menu): array
    {
        $file = $menu->file()->where('id', $data['fileId'])->first();

        $menu->type = $data['type'];
        $menu->update();
        if (is_null($file)) {
            $fileModel = $this->storeFile($data, $menu);
        }
        else {
            $fileModel = UploadService::updateFile($file->id, 'file', 'menu');
        }

        $fileModelUrl = is_null($fileModel) ? null: $fileModel['url'];
        $this->storeFileUrl($menu, $fileModelUrl);

        return $this->mapMenuModel($menu);
    }

    public function deleteMenu(Menu $menu) {
        $menu->delete();
    }

    //Site Service:
    public function getActiveLinks($category) {
        $links = Menu::query()->
        where('is_active', 1)->
        where('category', $category)->
        where('parent_id', null)->
        orderBy('level_order', 'ASC')->
        get();
        $linksModel = [];
        foreach ($links as $link) {
            $linksModel[] = $this->mapLocaleMenu($link);
        }
        return $linksModel;
    }

    public function reorderList(Array $data) {

        $list = json_decode($data['list']);
        foreach ($list as $item) {
            $block = Menu::query()->where('id', $item->id)->first();
            $block->level_order = $item->order;
            $block->update();
        }
    }
}
