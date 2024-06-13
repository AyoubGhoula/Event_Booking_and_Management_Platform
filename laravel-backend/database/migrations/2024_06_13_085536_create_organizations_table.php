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
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->rememberToken();
            $table->string('name');
            $table->string('email')->unique(); // Add email field
            $table->string('phone')->nullable(); // Add phone number field
            $table->boolean('is_verified')->default(false); // Add email verification field
            $table->string('address')->nullable(); // Add address field
            $table->string('avatar')->nullable(); // Add logo field
            $table->string('role')->default('organization'); // Add role field
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organizations');
    }
};
