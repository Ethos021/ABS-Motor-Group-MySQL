<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('stock_number')->nullable();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->string('badge')->nullable();
            $table->string('rego_num')->nullable();
            $table->string('vin')->nullable();
            $table->decimal('price', 12, 2)->nullable();
            $table->integer('year')->nullable();
            $table->integer('odometer')->nullable();
            $table->string('body')->nullable();
            $table->string('color')->nullable();
            $table->string('engine_size')->nullable();
            $table->string('gear_type')->nullable();
            $table->string('fuel_type')->nullable();
            $table->text('standard_features')->nullable();
            $table->text('optional_features')->nullable();
            $table->longText('adv_description')->nullable();
            $table->string('yard_code')->nullable();
            $table->string('series')->nullable();
            $table->string('nvic')->nullable();
            $table->decimal('special_price', 12, 2)->nullable();
            $table->boolean('is_demo')->default(false);
            $table->boolean('is_special')->default(false);
            $table->boolean('is_prestiged')->default(false);
            $table->string('stock_type')->nullable();
            $table->boolean('is_used')->default(false);
            $table->date('rego_expiry')->nullable();
            $table->string('video_link')->nullable();
            $table->string('drive')->nullable();
            $table->integer('door_num')->nullable();
            $table->integer('cylinders')->nullable();
            $table->string('redbook_code')->nullable();
            $table->boolean('is_miles')->default(false);
            $table->string('short_description')->nullable();
            $table->string('interior_colour')->nullable();
            $table->string('rego_state')->nullable();
            $table->date('build_date')->nullable();
            $table->date('compliance_date')->nullable();
            $table->decimal('gcm', 12, 2)->nullable();
            $table->decimal('gvm', 12, 2)->nullable();
            $table->decimal('tare', 12, 2)->nullable();
            $table->integer('sleeping_capacity')->nullable();
            $table->boolean('toilet')->default(false);
            $table->boolean('shower')->default(false);
            $table->boolean('air_conditioning')->default(false);
            $table->boolean('fridge')->default(false);
            $table->boolean('stereo')->default(false);
            $table->boolean('gps')->default(false);
            $table->boolean('is_dap')->default(false);
            $table->string('stock_status')->nullable();
            $table->string('engine_number')->nullable();
            $table->integer('gear_count')->nullable();
            $table->integer('engine_power')->nullable();
            $table->decimal('power_kw', 8, 2)->nullable();
            $table->decimal('power_hp', 8, 2)->nullable();
            $table->string('engine_make')->nullable();
            $table->string('serial_number')->nullable();
            $table->string('wheel_size')->nullable();
            $table->decimal('towball_weight', 8, 2)->nullable();
            $table->string('warranty')->nullable();
            $table->string('wheels')->nullable();
            $table->string('axle_configuration')->nullable();
            $table->integer('seats')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
