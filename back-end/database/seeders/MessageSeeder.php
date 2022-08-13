<?php

namespace Database\Seeders;

use App\Models\Message;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Container\Container;
use Illuminate\Database\Seeder;
use Faker\Generator;


class MessageSeeder extends Seeder
{
           /**
     * The current Faker instance.
     *
     * @var \Faker\Generator
     */
    protected $faker;

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
        for ($i=0; $i < 1000; $i++) { 
            $message = Message::create([
                'content' =>$this->faker->text(),
            ]);
            $author = User::find(random_int(1,200));
            $target = User::find(random_int(1,200));
            $message->messageAuthor()->associate($author);
            $message->privateMessageTarget()->associate($target);
            $message->save();
        }
        for ($i=0; $i < 1000; $i++) { 
            $message = Message::create([
                'content' =>$this->faker->text(),
            ]);
            $author = User::find(random_int(1,200));
            $target = Team::find(random_int(1,50));
            $message->message_mode = 'team';
            $message->messageAuthor()->associate($author);
            $message->teamMessage()->associate($target);
            $message->save();
        }
        for ($i=0; $i < 5000; $i++) { 
            $message = Message::create([
                'content' =>$this->faker->text(),
            ]);
            $author = User::find(random_int(1,200));
            $target = Project::find(random_int(1,800));
            $message->message_mode = 'project';
            $message->messageAuthor()->associate($author);
            $message->projectMessage()->associate($target);
            $message->save();
        }
    }
}
