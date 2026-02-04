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
            CREATE OR REPLACE VIEW customers_view AS
            SELECT
	            users.id user_id,
                customers.id customer_id,
                customers.name,
                users.email,
                users.avatar,
                users.is_active,
                users.created_at
            FROM users, customers WHERE
                users.reference_type = "Modules\\\User\\\Entities\\\Customer"
                AND
                users.reference_id = customers.id;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS customers_view');
    }
};
