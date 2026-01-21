<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();

            // Required
            $table->string('make');
            $table->string('model');
            $table->year('year');
            $table->decimal('price', 10, 2);

            // Identification
            $table->string('stock_number')->nullable();
            $table->string('badge')->nullable();
            $table->string('rego_num')->nullable();
            $table->string('vin')->nullable()->unique();
            $table->string('engine_number')->nullable();
            $table->string('serial_number')->nullable();

            // Pricing
            $table->decimal('special_price', 10, 2)->nullable();

            // Specs
            $table->integer('odometer')->nullable();
            $table->string('body')->nullable();
            $table->string('color')->nullable();
            $table->string('interior_colour')->nullable();
            $table->string('engine_size')->nullable();
            $table->string('engine_make')->nullable();
            $table->integer('cylinders')->nullable();
            $table->string('gear_type')->nullable();
            $table->integer('gear_count')->nullable();
            $table->string('fuel_type')->nullable();
            $table->string('drive')->nullable();
            $table->integer('door_num')->nullable();
            $table->string('wheel_size')->nullable();
            $table->string('wheels')->nullable();
            $table->string('axle_configuration')->nullable();

            // Power
            $table->integer('engine_power')->nullable();
            $table->integer('power_kw')->nullable();
            $table->integer('power_hp')->nullable();

            // Registration
            $table->string('rego_state')->nullable();
            $table->date('rego_expiry')->nullable();

            // Dates
            $table->date('build_date')->nullable();
            $table->date('compliance_date')->nullable();

            // Weights & capacity
            $table->integer('gcm')->nullable();
            $table->integer('gvm')->nullable();
            $table->integer('tare')->nullable();
            $table->integer('sleeping_capacity')->nullable();

            // Features
            $table->boolean('toilet')->default(false);
            $table->boolean('shower')->default(false);
            $table->boolean('air_conditioning')->default(false);
            $table->boolean('fridge')->default(false);
            $table->boolean('stereo')->default(false);
            $table->boolean('gps')->default(false);

            // Descriptions
            $table->text('standard_features')->nullable();
            $table->text('optional_features')->nullable();
            $table->text('adv_description')->nullable();
            $table->text('short_description')->nullable();

            // Codes
            $table->string('yard_code')->nullable();
            $table->string('series')->nullable();
            $table->string('nvic')->nullable();
            $table->string('redbook_code')->nullable();

            // Stock flags
            $table->enum('stock_type', ['A','B','C','H','M','T']);
            $table->boolean('is_demo')->default(false);
            $table->boolean('is_special')->default(false);
            $table->boolean('is_prestiged')->default(false);
            $table->boolean('is_used')->default(false);
            $table->boolean('is_dap')->default(false);
            $table->boolean('is_miles')->default(false);
            $table->boolean('is_featured')->default(false);

            $table->string('stock_status')->nullable();
            $table->string('warranty')->nullable();
            $table->integer('towball_weight')->nullable();

            // Media
            $table->json('images')->nullable();

            // Audit
            $table->foreignId('created_by')->nullable()->constrained('users');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
