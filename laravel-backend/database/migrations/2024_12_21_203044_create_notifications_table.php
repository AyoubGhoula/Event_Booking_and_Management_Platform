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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('contenu');
            $table->datetime('envoye_le');
            $table->unsignedBigInteger('destinataire_id');
            $table->unsignedBigInteger('evenement_id');
            $table->unsignedBigInteger('participant_id');
            $table->foreign('destinataire_id')->references('id')->on('organisateurs');
            $table->foreign('evenement_id')->references('id')->on('participants');
            $table->foreign('participant_id')->references('id')->on('evenements')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
