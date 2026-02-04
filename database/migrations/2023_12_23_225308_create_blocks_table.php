<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
//            ===================================================
//            We can use category_id if we want to categorize blocks from DB.
//            Or we can categorize blocks using ENUM (Programmatically) using category field
//            Or we can use general blocks without (category_id, category) fields.
//            ===================================================
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('category')->nullable();
//            $table->string('name');
//            $table->string('description')->nullable();
            $table->string('image')->nullable();
            $table->string('url')->nullable();
            $table->string('file')->nullable();
            $table->integer('order')->default(1);
            $table->string('is_active')->default(true);
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->integer('order')->default(1)->change();
            $table->timestamps();

//            $table->foreign('category_id')
//                ->references('id')
//                ->on('block_categories')
//                ->onUpdate('cascade')
//                ->onDelete('cascade');

            $table->foreign('parent_id')
                ->references('id')
                ->on('blocks')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks');
    }
};
