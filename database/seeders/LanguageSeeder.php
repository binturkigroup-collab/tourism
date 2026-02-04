<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Language::factory()->count(2)->sequence([
            'name' => 'Arabic',
            'code' => 'ar',
            'flag_code' => 'ae',
            'level_order' => 1,
            'direction' => 'rtl',
            'is_active' => 1,
        ], [
            'name' => 'English',
            'code' => 'en',
            'flag_code' => 'gb',
            'level_order' => 2,
            'direction' => 'ltr',
            'is_active' => 1,
        ])->create();
    }
}
