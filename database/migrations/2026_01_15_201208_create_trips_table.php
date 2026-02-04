<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('block_id');
            $table->unsignedBigInteger('city_id')->nullable();
            $table->decimal('price', 8, 2)->nullable();
            $table->integer('max_guests')->nullable();
            $table->integer('min_age')->nullable();
            $table->string('package')->nullable();
            $table->float('duration')->nullable();
            $table->string('unit')->nullable(); // Days / Hours
            $table->timestamps();

            $table
                ->foreign('block_id')
                ->references('id')
                ->on('blocks')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table
                ->foreign('city_id')
                ->references('id')
                ->on('blocks')
                ->onDelete('set null')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
