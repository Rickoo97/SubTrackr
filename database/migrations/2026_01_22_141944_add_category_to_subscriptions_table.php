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
    Schema::table('subscriptions', function (Blueprint $table) {
        // We geven het een standaardwaarde 'Overig' zodat bestaande data niet crasht
        $table->string('category')->default('Overig')->after('name');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            //
        });
    }
};
