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
    private $positions = ['team_leader' => '0', 'developer' => '1', 'support' => '2', 'tester' => '3'];
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
        while ($this->count < 10) {
            $team = Team::create([
                'title' => $this->faker->unique()->word(),
            ]);
            $members = [];
            for ($i=0; $i < random_int(5, 10); $i++) {
                array_push($members, User::find(random_int(1, 200)));
            }
            array_map(
                function ($user) use ($team) {
                    $team->usersInTeam()->attach($user, ['team_position' => array_rand($this->positions)]);
                },
                $members
            );
            $this->count = Team::whereRaw('id = (select max(`id`) from teams)')->get()[0]->id;
        }
    }
}
