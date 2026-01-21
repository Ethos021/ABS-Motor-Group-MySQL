<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();

            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();

            $table->enum('role', [
                'Sales',
                'Finance',
                'Manager',
                'Service Advisor'
            ]);

            $table->boolean('is_active')->default(true);
            $table->json('availability_hours')->nullable();

            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
