<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Container\Container;
use Faker\Generator;
use Illuminate\Support\Str;

class ProjectSeeder extends Seeder
{
    /**
     * The current Faker instance.
     *
     * @var \Faker\Generator
     */
    protected $faker;
    
    private $state = ['upcoming', 'pending', 'overdue', 'not_started', 'priority', 'canceled', 'active'];

    /**
     * Create a new seeder instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->faker = $this->withFaker();
    }

    /**
     * Get a new Faker instance.
     *
     * @return \Faker\Generator
     */
    protected function withFaker()
    {
        return Container::getInstance()->make(Generator::class);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 30; $i++) { 
            $project = Project::create([
                'title' => Str::random(7),
                'status' => $this->state[array_rand($this->state)],
                'deadline' => $this->faker->dateTimeBetween('+1 month', '+1 year'),
            ]);
            $user = User::find(random_int(1, 200));
            $project->projectManager()->associate($user);

            $customer = Customer::find(random_int(1, 50));
            $project->customer()->associate($customer);

            $team = Team::find(random_int(1, 10));
            $project->assignedTeams()->attach($team, ['created_at' => now()]);

            $project->save();
        }
    }
}
