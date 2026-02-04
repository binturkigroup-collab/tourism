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
//            We can use category_id if we want to categorize menus from DB.
//            Or we can categorize menus using ENUM (Programmatically) using category field
//            Or we can use general menus without (category_id, category) fields.
//            ===================================================
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('category')->nullable();
            $table->string('name');
            $table->integer('level_order')->nullable();
            $table->string('url');
            $table->string('target')->nullable();
            $table->string('type')->nullable(); //page or external_link.
            $table->string('file')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('url')->nullable()->change();
            $table->string('block_type')->nullable();
            $table->timestamps();

            $table->foreign('parent_id')
                ->references('id')
                ->on('menus')
                ->onUpdate('cascade')
                ->onDelete('cascade');

//            $table->foreign('category_id')
//                ->references('id')
//                ->on('menu_categories')
//                ->onUpdate('cascade')
//                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
};
