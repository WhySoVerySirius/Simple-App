<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Container\Container;
use Faker\Generator;

class TeamSeeder extends Seeder
{
           /**
     * The current Faker instance.
     *
     * @var \Faker\Generator
     */
    protected $faker;
    private $positions = ['developer' => '0', 'support' => '1', 'tester' => '2'];
    private $count;

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
        $this->count = Team::find(1)?Team::whereRaw('id = (select max(`id`) from teams)')->first()->id: 1;
        while ($this->count < 50) {
            $team = Team::create([
                'title' => $this->faker->unique()->word(),
            ]);
            $members = [];
            for ($i=0; $i < random_int(10, 30); $i++) {
                array_push($members, User::find(random_int(1, 200)));
            }
            array_map(
                function ($user) use ($team) {
                    $team->usersInTeam()->attach($user, ['team_position' => array_rand($this->positions)]);
                },
                $members
            );
            $team->assignedLeader()->associate(User::find(random_int(1, 200)));
            $team->save();
            $this->count = Team::whereRaw('id = (select max(`id`) from teams)')->get()[0]->id;
        }
    }
}
