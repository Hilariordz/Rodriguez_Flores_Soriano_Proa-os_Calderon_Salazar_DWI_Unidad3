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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->string('categoria'); // entrada, plato_fuerte, postre, bebida
            $table->decimal('precio', 8, 2);
            $table->string('imagen')->nullable();
            $table->string('tiempo_preparacion')->nullable();
            $table->boolean('disponible')->default(true);
            $table->timestamps();
            
            $table->index('categoria');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
