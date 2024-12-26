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
        Schema::create('evenements', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('type');
            $table->text('description');
            $table->string('image');
            $table->string('lieu');
            $table->string('map_link');
            $table->datetime('date_debut');
            $table->datetime('date_fin');
            $table->integer('nb_max_participants');
            $table->integer('nb_participants')->default(0);
            $table->unsignedBigInteger('organisateur_id');
            $table->foreign('organisateur_id')->references('id')->on('organisateurs')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evenements');
    }
};
