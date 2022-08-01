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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->foreignId('customer_id')->nullable()->constrained();
            $table->foreignId('project_manager')->nullable();
            $table->foreign('project_manager')->references('id')->on('users');
            $table->enum('status', ['upcoming', 'pending', 'overdue', 'not_started', 'priority', 'canceled', 'active']);
            $table->date('deadline');
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
        Schema::dropIfExists('projects');
    }
};
