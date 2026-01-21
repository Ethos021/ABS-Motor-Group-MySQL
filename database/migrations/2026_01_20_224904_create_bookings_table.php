<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('enquiry_id')->nullable()->constrained('enquiries');

            $table->enum('booking_type', [
                'test_drive',
                'inspection',
                'finance_meeting',
                'delivery',
                'consultation'
            ]);

            $table->dateTime('scheduled_datetime');
            $table->integer('duration_minutes')->default(60);

            $table->foreignId('staff_id')->nullable()->constrained('staff');
            $table->foreignId('vehicle_id')->nullable()->constrained('vehicles');
            $table->json('vehicle_snapshot')->nullable();

            // Required
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_email')->nullable();
            $table->text('customer_notes')->nullable();

            $table->enum('status', [
                'pending',
                'confirmed',
                'completed',
                'cancelled',
                'no_show'
            ])->default('pending');

            $table->boolean('confirmation_sent')->default(false);
            $table->boolean('reminder_sent')->default(false);

            $table->text('notes')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->timestamp('cancelled_at')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
