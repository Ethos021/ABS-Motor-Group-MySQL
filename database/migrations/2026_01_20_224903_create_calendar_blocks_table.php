<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('calendar_blocks', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');

            $table->boolean('is_recurring')->default(false);
            $table->enum('recurrence_pattern', ['daily','weekly','monthly','yearly'])->nullable();
            $table->date('recurrence_end_date')->nullable();

            $table->enum('block_type', [
                'holiday',
                'meeting',
                'maintenance',
                'training',
                'other'
            ]);

            $table->foreignId('staff_id')->constrained('staff');
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);

            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('calendar_blocks');
    }
};
