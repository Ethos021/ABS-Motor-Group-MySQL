<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('vehicles', function (Blueprint $table) {
        $table->id();
        $table->string('make');
        $table->string('model');
        $table->integer('year');
        $table->decimal('price', 10, 2);
        $table->integer('mileage');
        $table->string('body_type')->nullable();
        $table->string('fuel_type')->nullable();
        $table->string('stock_number')->nullable();
        $table->text('description')->nullable();
        $table->string('image_url')->nullable();
        $table->timestamps();
    });
}
};
