<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Maak jouw inlog-account aan
        User::factory()->create([
            'name' => 'Senior Dev',
            'email' => 'admin@subtrackr.com',
            'password' => bcrypt('password'),
        ]);

        // 2. Maak 10 nep-abonnementen voor dit account
        Subscription::factory(10)->create([
            'user_id' => 1
        ]);
    }
}