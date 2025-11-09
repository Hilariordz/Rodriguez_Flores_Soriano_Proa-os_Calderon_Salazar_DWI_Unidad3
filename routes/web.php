<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/recetas', function () {
    return Inertia::render('Recetas');
})->middleware(['auth', 'verified'])->name('recetas');

Route::get('/receta/{id}', function ($id) {
    return Inertia::render('RecetaDetalle', ['recetaId' => $id]);
})->middleware(['auth', 'verified'])->name('receta.detalle');

Route::get('/mis-favoritas', function () {
    return Inertia::render('MisFavoritas');
})->middleware(['auth', 'verified'])->name('favoritas');

Route::get('/mis-reservaciones', function () {
    return Inertia::render('MisReservaciones');
})->middleware(['auth', 'verified'])->name('reservaciones');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Ruta de búsqueda para el Dashboard (usa la API internamente)
Route::get('/buscar', function (Illuminate\Http\Request $request) {
    if (!$request->has('query')) {
        return Inertia::render('Dashboard');
    }

    $apiKey = env('SPOONACULAR_KEY');
    $response = Http::timeout(10)->get("https://api.spoonacular.com/recipes/complexSearch", [
        'query' => $request->query('query'),
        'number' => 8,
        'language' => 'es',
        'cuisine' => 'mexican,spanish,latin american',
        'apiKey' => $apiKey,
    ]);
    $recetas = $response->json();

    return Inertia::render('Dashboard', ['recetas' => $recetas]);
})->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
