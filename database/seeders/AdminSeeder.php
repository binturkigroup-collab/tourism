<?php

namespace Database\Seeders;

use App\Enums\AdminEnum;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends DatabaseSeeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Admin::factory()->create([
            'first_name' => 'admin',
            'last_name' => 'admin',
            'role' => AdminEnum::ADMIN->value,
        ]);

        $adminUser = User::factory()->create([
            'reference_id' => $admin->id,
            'reference_type' => Admin::class,
            'email' => 'feras@email.com',
            'password' => Hash::make($this->pw),
            'is_active' => 1,
        ]);
    }
}
