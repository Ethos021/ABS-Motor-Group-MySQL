<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateVehiclesManagementSchema extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Users table
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_date')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->string('created_by', 255)->nullable();
            $table->string('full_name', 255)->nullable();
            $table->string('email', 255)->unique();
            $table->string('role', 50)->default('user');
        });

        // Vehicles table
        Schema::create('vehicles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_date')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->string('created_by', 255)->nullable();
            $table->string('stock_number', 100)->nullable();
            $table->string('make', 100);
            $table->string('model', 100);
            $table->string('badge', 100)->nullable();
            $table->string('rego_num', 50)->nullable();
            $table->string('vin', 100)->nullable();
            $table->decimal('price', 12, 2);
            $table->integer('year');
            $table->decimal('odometer', 12, 2)->nullable();
            $table->string('body', 100)->nullable();
            $table->string('color', 100)->nullable();
            $table->string('engine_size', 50)->nullable();
            $table->string('gear_type', 50)->nullable();
            $table->string('fuel_type', 50)->nullable();
            $table->text('standard_features')->nullable();
            $table->text('optional_features')->nullable();
            $table->text('adv_description')->nullable();
            $table->string('yard_code', 50)->nullable();
            $table->string('series', 100)->nullable();
            $table->string('nvic', 100)->nullable();
            $table->decimal('special_price', 12, 2)->nullable();
            $table->boolean('is_demo')->default(false);
            $table->boolean('is_special')->default(false);
            $table->boolean('is_prestiged')->default(false);
            $table->string('stock_type', 1)->nullable(); // CHECK should be validated in Laravel app logic
            $table->boolean('is_used')->default(false);
            $table->date('rego_expiry')->nullable();
            $table->string('video_link', 255)->nullable();
            $table->string('drive', 100)->nullable();
            $table->integer('door_num')->nullable();
            $table->integer('cylinders')->nullable();
            $table->string('redbook_code', 255)->nullable();
            $table->boolean('is_miles')->default(false);
            $table->text('short_description')->nullable();
            $table->string('interior_colour', 100)->nullable();
            $table->string('rego_state', 50)->nullable();
            $table->date('build_date')->nullable();
            $table->date('compliance_date')->nullable();
            $table->string('gcm', 50)->nullable();
            $table->string('gvm', 50)->nullable();
            $table->string('tare', 50)->nullable();
            $table->integer('sleeping_capacity')->nullable();
            $table->integer('toilet')->nullable();
            $table->integer('shower')->nullable();
            $table->string('air_conditioning', 50)->nullable();
            $table->string('fridge', 50)->nullable();
            $table->string('stereo', 50)->nullable();
            $table->boolean('is_dap')->default(false);
            $table->string('stock_status', 50)->nullable();
            $table->string('engine_number', 100)->nullable();
            $table->integer('gear_count')->nullable();
            $table->string('engine_power', 50)->nullable();
            $table->string('power_kw', 50)->nullable();
            $table->string('power_hp', 50)->nullable();
            $table->string('engine_make', 100)->nullable();
            $table->string('gps', 50)->nullable();
            $table->string('serial_number', 100)->nullable();
            $table->string('wheel_size', 50)->nullable();
            $table->string('towball_weight', 50)->nullable();
            $table->string('warranty', 255)->nullable();
            $table->integer('wheels')->nullable();
            $table->string('axle_configuration', 50)->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_featured')->default(false);
        });

        // Enquiries table
        Schema::create('enquiries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_date')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->string('created_by', 255)->nullable();
            $table->string('enquiry_type', 50)->default('vehicle_interest');
            $table->string('firstName', 100);
            $table->string('lastName', 100);
            $table->string('mobile', 50)->nullable();
            $table->string('email', 255)->nullable();
            $table->text('message')->nullable();
            $table->boolean('hasTradein')->default(false);
            $table->string('tradeInYear', 10)->nullable();
            $table->string('tradeInMake', 100)->nullable();
            $table->string('tradeInModel', 100)->nullable();
            $table->decimal('tradeInOdometer', 12, 2)->nullable();
            $table->boolean('wantsFinance')->default(false);
            $table->boolean('wantsTestDrive')->default(false);
            $table->uuid('vehicleId')->nullable();
            $table->text('vehicleDetails')->nullable();
            $table->decimal('vehiclePrice', 12, 2)->nullable();
            $table->text('vehicleSnapshot')->nullable();
            $table->text('financeEstimate')->nullable();
            $table->string('preferredContactMethod', 50)->default('phone');
            $table->string('preferredContactTime', 100)->nullable();
            $table->string('utmSource', 255)->nullable();
            $table->string('utmMedium', 255)->nullable();
            $table->string('utmCampaign', 255)->nullable();
            $table->text('referrer')->nullable();
            $table->text('pageUrl')->nullable();
            $table->string('ipAddress', 50)->nullable();
            $table->string('status', 50)->default('new');
            $table->string('priority', 50)->default('medium');
            $table->uuid('assignedStaffId')->nullable();
            $table->timestamp('contactedAt')->nullable();
            $table->timestamp('closedAt')->nullable();
            $table->text('internalNotes')->nullable();

            // Foreign keys
            $table->foreign('vehicleId')->references('id')->on('vehicles')->onDelete('set null');
            $table->foreign('assignedStaffId')->references('id')->on('users')->onDelete('set null');
        });

        // Staff table
        Schema::create('staff', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_date')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->string('created_by', 255)->nullable();
            $table->string('full_name', 255);
            $table->string('email', 255);
            $table->string('phone', 50)->nullable();
            $table->string('role', 50);
            $table->boolean('is_active')->default(true);
            $table->text('availability_hours')->nullable();
        });

        // Additional tables like calendar_blocks and bookings would follow...
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enquiries');
        Schema::dropIfExists('vehicles');
        Schema::dropIfExists('users');
        Schema::dropIfExists('staff');
    }
}