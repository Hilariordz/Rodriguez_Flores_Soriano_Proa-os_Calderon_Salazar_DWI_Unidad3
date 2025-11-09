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
        Schema::create('favoritas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('receta_id'); // ID de Spoonacular
            $table->string('nombre');
            $table->string('imagen')->nullable();
            $table->string('tiempo')->nullable();
            $table->text('descripcion')->nullable();
            $table->string('precio')->nullable();
            $table->timestamps();
            
            // Evitar duplicados
            $table->unique(['user_id', 'receta_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favoritas');
    }
};
