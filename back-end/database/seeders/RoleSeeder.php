<?php

namespace Database\Seeders;

use App\Models\Role;
use GuzzleHttp\Promise\Create;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create(['role_title' => Role::ROLE_ADMIN]);
        Role::create(['role_title' => Role::ROLE_USER]);
        Role::create(['role_title' => Role::ROLE_PROJECT_MANAGER]);
    }
}
