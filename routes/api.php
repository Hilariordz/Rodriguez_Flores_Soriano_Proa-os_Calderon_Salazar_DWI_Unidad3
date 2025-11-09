<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecetaController;
use App\Http\Controllers\Api\FavoritaController;
use App\Http\Controllers\Api\ValoracionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReservacionController;

// Rutas públicas con rate limiting
Route::middleware(['throttle:60,1'])->group(function () {
    
    // API de Recetas (Spoonacular)
    Route::prefix('recetas')->group(function () {
        Route::get('/buscar', [RecetaController::class, 'buscar']);
        Route::get('/detalle/{id}', [RecetaController::class, 'detalle']);
        Route::get('/aleatorias', [RecetaController::class, 'aleatorias']);
        Route::get('/categoria/{tipo}', [RecetaController::class, 'categoria']);
    });

    // Valoraciones públicas (solo lectura)
    Route::get('/valoraciones/{recetaId}/promedio', [ValoracionController::class, 'promedio']);
    Route::get('/valoraciones/{recetaId}/distribucion', [ValoracionController::class, 'distribucion']);
});

// Rutas protegidas con autenticación Sanctum
Route::middleware(['auth:sanctum', 'throttle:100,1'])->group(function () {
    
    // API de Usuario
    Route::prefix('user')->group(function () {
        Route::get('/me', [UserController::class, 'me']);
        Route::put('/profile', [UserController::class, 'updateProfile']);
        Route::put('/password', [UserController::class, 'changePassword']);
        Route::get('/stats', [UserController::class, 'stats']);
        Route::delete('/account', [UserController::class, 'deleteAccount']);
    });
    
    // API de Favoritas (CRUD completo)
    Route::prefix('favoritas')->group(function () {
        Route::get('/', [FavoritaController::class, 'index']);
        Route::get('/{id}', [FavoritaController::class, 'show']);
        Route::post('/', [FavoritaController::class, 'store']);
        Route::put('/{id}', [FavoritaController::class, 'update']);
        Route::delete('/{id}', [FavoritaController::class, 'destroy']);
        Route::get('/check/{recetaId}', [FavoritaController::class, 'check']);
    });

    // API de Valoraciones (CRUD completo)
    Route::prefix('valoraciones')->group(function () {
        Route::get('/{recetaId}/mi-valoracion', [ValoracionController::class, 'miValoracion']);
        Route::post('/', [ValoracionController::class, 'store']);
        Route::delete('/{recetaId}', [ValoracionController::class, 'destroy']);
    });

    // API de Reservaciones (CRUD completo)
    Route::prefix('reservaciones')->group(function () {
        Route::get('/', [ReservacionController::class, 'index']);
        Route::post('/', [ReservacionController::class, 'store']);
        Route::put('/{id}', [ReservacionController::class, 'update']);
        Route::put('/{id}/cancelar', [ReservacionController::class, 'cancel']);
        Route::delete('/{id}', [ReservacionController::class, 'destroy']);
    });
});
