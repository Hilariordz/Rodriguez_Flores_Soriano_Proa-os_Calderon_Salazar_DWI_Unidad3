<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RecetaController;
use App\Http\Controllers\Api\FavoritaController;
use App\Http\Controllers\Api\ValoracionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ReservacionController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Admin\ReservacionAdminController;
use App\Http\Controllers\Admin\MenuAdminController;

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

    // Menú público (solo items disponibles)
    Route::prefix('menu')->group(function () {
        Route::get('/', [MenuController::class, 'index']);
        Route::get('/{id}', [MenuController::class, 'show']);
    });
});

// Rutas protegidas con autenticación web (sesión)
Route::middleware(['auth', 'throttle:100,1'])->group(function () {
    
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

// Rutas de Administrador (requiere rol admin)
Route::middleware(['auth', 'admin', 'throttle:200,1'])->prefix('admin')->group(function () {
    
    // Gestión de Reservaciones (Admin)
    Route::prefix('reservaciones')->group(function () {
        Route::get('/', [ReservacionAdminController::class, 'index']);
        Route::put('/{id}/confirmar', [ReservacionAdminController::class, 'confirmar']);
        Route::put('/{id}/cancelar', [ReservacionAdminController::class, 'cancelar']);
        Route::get('/estadisticas', [ReservacionAdminController::class, 'estadisticas']);
    });

    // Gestión de Menú (Admin)
    Route::prefix('menu')->group(function () {
        Route::get('/', [MenuAdminController::class, 'index']);
        Route::post('/', [MenuAdminController::class, 'store']);
        Route::put('/{id}', [MenuAdminController::class, 'update']);
        Route::delete('/{id}', [MenuAdminController::class, 'destroy']);
        Route::put('/{id}/toggle-disponibilidad', [MenuAdminController::class, 'toggleDisponibilidad']);
    });
});
