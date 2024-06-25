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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
            $table->datetime('start_datetime');
            $table->string('lient_event');
            $table->integer("prix")->default(0);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->integer("nm_max");
            $table->integer("nm_participer")->default(0);
            $table->string("gender")->default("-");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

