<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();

            $table->enum('enquiry_type', [
                'vehicle_interest',
                'test_drive',
                'finance',
                'trade_in',
                'general',
                'sell_vehicle'
            ]);

            // Required
            $table->string('firstName');
            $table->string('lastName');

            $table->string('mobile')->nullable();
            $table->string('email')->nullable();
            $table->text('message')->nullable();

            // Trade-in
            $table->boolean('hasTradein')->default(false);
            $table->integer('tradeInYear')->nullable();
            $table->string('tradeInMake')->nullable();
            $table->string('tradeInModel')->nullable();
            $table->integer('tradeInOdometer')->nullable();

            // Finance/Test Drive
            $table->boolean('wantsFinance')->default(false);
            $table->boolean('wantsTestDrive')->default(false);

            // Vehicle
            $table->foreignId('vehicle_id')->nullable()->constrained('vehicles');
            $table->json('vehicleSnapshot')->nullable();
            $table->decimal('vehiclePrice', 10, 2)->nullable();
            $table->json('financeEstimate')->nullable();

            // Contact preferences
            $table->enum('preferredContactMethod', ['phone','email','whatsapp'])->nullable();
            $table->string('preferredContactTime')->nullable();

            // Tracking
            $table->string('utmSource')->nullable();
            $table->string('utmMedium')->nullable();
            $table->string('utmCampaign')->nullable();
            $table->string('referrer')->nullable();
            $table->string('pageUrl')->nullable();
            $table->ipAddress('ipAddress')->nullable();

            // Status
            $table->enum('status', [
                'new',
                'contacted',
                'qualified',
                'appointment_set',
                'lost',
                'closed_won',
                'closed_lost'
            ])->default('new');

            $table->enum('priority', ['low','medium','high','urgent'])->default('medium');

            $table->foreignId('assignedStaffId')->nullable()->constrained('staff');
            $table->timestamp('contactedAt')->nullable();
            $table->timestamp('closedAt')->nullable();

            $table->text('internalNotes')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
