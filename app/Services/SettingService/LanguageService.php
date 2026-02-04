<?php

namespace App\Services\SettingService;

use App\Models\Language;
use Illuminate\Support\Facades\URL;
use JetBrains\PhpStorm\ArrayShape;

class LanguageService
{
    public function mapLanguageModel(Language $language): array
    {
        return [
            'id' => $language->id,
            'name' => $language->name,
            'code' => $language->code,
            'flagCode' => $language->flag_code,
            'direction' => $language->direction,
            'isActive' => (bool)$language->is_active,
        ];
    }

    public function getLanguages(): array
    {
        $languageModels = [];
        $languages = Language::query()->whereIsActive(1)->get();
        foreach ($languages as $lang) {
            $languageModels[] = $this->mapLanguageModel($lang);
        }
        return $languageModels;
    }

    public function getActiveLanguages(): array
    {
        $languages = Language::query()->where('is_active', 1)->get();
        $languageModels = [];
        foreach ($languages as $language) {
            $languageModels[] = $this->mapLanguageModel($language);
        }
        return $languageModels;
    }

    private function fillLanguageForm(Language &$language) {
        $data = request()->all();
        $language->fill([
            'name' => $data['name'],
            'code' => $data['code'],
            'direction' => $data['direction'],
            'is_active' => $data['isActive'],
        ]);
    }

    #[ArrayShape(['id' => "mixed", 'name' => "mixed", 'code' => "mixed", 'isActive' => "mixed"])]
    public function storeLanguage(): array
    {
        $language = new Language();
        $this->fillLanguageForm($language);
        $language->save();
        return $this->mapLanguageModel($language);
    }

    #[ArrayShape(['id' => "mixed", 'name' => "mixed", 'code' => "mixed",
        'direction' => "mixed", 'isActive' => "mixed"])]
    public function updateLanguage($id): array
    {
        $language = Language::query()->where('id', $id)->first();
        $this->fillLanguageForm($language);
        $language->update();
        return $this->mapLanguageModel($language);
    }

    public function deleteLanguage($id) {
        $language = Language::query()->where('id', $id)->first();
        $language->delete();
    }

    public function setLanguage($data): void
    {
        app()->setLocale($data['language']);
    }

    public function getLanguage(): string
    {
        $terms = explode('/', URL::getRequest()->path());
        return $terms[0] === '' ? app()->getLocale() : $terms[0];
    }
}
