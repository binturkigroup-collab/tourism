<?php

use Illuminate\Support\Facades\DB;
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
        DB::statement('
            CREATE OR REPLACE VIEW menu_view AS
            SELECT
                menu_info.menu_id,
                menu_info.parent_id,
                parent_trans.name parent_name,
                menu_info.category,
                menu_info.menu_name,
                menu_info.name,
                menu_info.slug,
                menu_info.html_text,
                menu_info.language,
                menu_info.menu_order,
                menu_info.menu_url,
                menu_info.target,
                menu_info.type,
                menu_info.file,
                menu_info.image,
                menu_info.is_active,
                menu_info.block_type,
                menu_info.url,
                menu_info.file_name,
                menu_info.file_description,
                menu_info.is_image,
                menu_info.is_cover
            FROM

            (
                SELECT
                menus.id menu_id,
                menus.category,
                menus.parent_id,
                menus.name menu_name,
                trans.name,
                trans.slug,
                trans.html_text,
                trans.language,
                menus.level_order menu_order,
                menus.url menu_url,
                menus.target,
                menus.type,
                menus.file,
                menus.image,
                menus.is_active,
                menus.block_type,
                fl.url,
                fl.name file_name,
                fl.description file_description,
                fl.is_image,
                fl.is_cover

                FROM
                menus LEFT JOIN files fl
                ON fl.reference_type = "Modules\\\Website\\\Entities\\\Menu"
                AND fl.reference_id = menus.id,
            	menu_translations trans
            	WHERE menus.id = trans.menu_id
            ) AS menu_info LEFT JOIN menu_translations parent_trans
            	ON menu_info.parent_id = parent_trans.menu_id
                AND menu_info.language = parent_trans.language
            ORDER BY menu_info.menu_order, menu_info.category ASC;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS menu_view');
    }
};
