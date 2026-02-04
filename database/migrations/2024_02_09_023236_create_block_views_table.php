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
            CREATE OR REPLACE VIEW blocks_view AS
            SELECT
                block_info.block_id,
                block_info.parent_id,
                block_info.translation_id,
                block_info.file_id,
                block_info.category,
                block_info.order,
                block_info.is_active,
                block_info.start_date,
                block_info.end_date,
                block_info.name,
                parent_trans.name parent_name,
                block_info.description,
                block_info.slug,
                block_info.language,
                block_info.url,
                block_info.file_name,
                block_info.file_description,
                block_info.is_image,
                block_info.is_cover
            FROM
            	(
                    SELECT
                    	blocks.id block_id,
                    	blocks.parent_id,
                    	trans.id translation_id,
                    	fl.id file_id,
                		blocks.category,
                		blocks.order,
                		blocks.is_active,
                		blocks.start_date,
                		blocks.end_date,
                		trans.name,
                		trans.description,
                		trans.slug,
                		trans.language,
                		fl.url,
                		fl.name file_name,
                		fl.description file_description,
                		fl.is_image,
                		fl.is_cover
                    FROM
                    	blocks LEFT JOIN files fl
                    	ON fl.reference_type = "Modules\\\Website\\\Entities\\\Block"
                    	AND fl.reference_id = blocks.id,
                		block_translations trans
                    WHERE
                		blocks.id = trans.block_id
                ) AS block_info LEFT JOIN block_translations parent_trans
                	ON block_info.parent_id = parent_trans.block_id
                    AND block_info.language = parent_trans.language
                ORDER BY block_info.order, block_info.category ASC;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS blocks_view');
    }
};
