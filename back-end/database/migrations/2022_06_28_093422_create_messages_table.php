<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author');
            $table->foreign('author')->references('id')->on('users');
            $table->foreignId('target')->nullable();
            $table->foreign('target')->references('id')->on('users');
            $table->enum('message_mode', ['private', 'team', 'global', 'project']);
            $table->foreignId('team_id')->nullable()->constrained();
            $table->foreignid('project_id')->nullable()->constrained();
            $table->text('content');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
};
