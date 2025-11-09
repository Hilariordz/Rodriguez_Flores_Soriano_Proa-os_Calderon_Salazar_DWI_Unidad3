<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\JsonResponse;

class RecetaController extends Controller
{
    /**
     * Buscar recetas por término de búsqueda
     */
    public function buscar(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => 'required|string|min:2|max:100',
            'number' => 'nullable|integer|min:1|max:20'
        ]);

        try {
            $apiKey = env('SPOONACULAR_KEY');
            
            if (!$apiKey) {
                return response()->json([
                    'success' => false,
                    'message' => 'API key no configurada'
                ], 500);
            }

            $response = Http::timeout(10)->get("https://api.spoonacular.com/recipes/complexSearch", [
                'query' => $validated['query'],
                'number' => $validated['number'] ?? 8,
                'language' => 'es',
                'cuisine' => 'mexican,spanish,latin american',
                'apiKey' => $apiKey,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al consultar el servicio externo'
                ], 503);
            }

            return response()->json([
                'success' => true,
                'data' => $response->json()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la solicitud'
            ], 500);
        }
    }

    /**
     * Obtener detalle de una receta
     */
    public function detalle(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'id' => 'nullable|integer'
        ]);

        if (!is_numeric($id)) {
            return response()->json([
                'success' => false,
                'message' => 'ID de receta inválido'
            ], 400);
        }

        try {
            $apiKey = env('SPOONACULAR_KEY');
            
            $response = Http::timeout(10)->get("https://api.spoonacular.com/recipes/{$id}/information", [
                'apiKey' => $apiKey,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Receta no encontrada'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $response->json()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la solicitud'
            ], 500);
        }
    }

    /**
     * Obtener recetas aleatorias
     */
    public function aleatorias(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'number' => 'nullable|integer|min:1|max:10'
        ]);

        try {
            $apiKey = env('SPOONACULAR_KEY');
            
            $response = Http::timeout(10)->get("https://api.spoonacular.com/recipes/random", [
                'number' => $validated['number'] ?? 6,
                'tags' => 'mexican,spanish,latin american',
                'apiKey' => $apiKey,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al consultar el servicio externo'
                ], 503);
            }

            return response()->json([
                'success' => true,
                'data' => $response->json()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la solicitud'
            ], 500);
        }
    }

    /**
     * Obtener recetas por categoría
     */
    public function categoria(Request $request, string $tipo): JsonResponse
    {
        $tiposPermitidos = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert'];
        
        if (!in_array($tipo, $tiposPermitidos)) {
            return response()->json([
                'success' => false,
                'message' => 'Tipo de comida inválido',
                'tipos_permitidos' => $tiposPermitidos
            ], 400);
        }

        $validated = $request->validate([
            'number' => 'nullable|integer|min:1|max:20'
        ]);

        try {
            $apiKey = env('SPOONACULAR_KEY');
            
            $response = Http::timeout(10)->get("https://api.spoonacular.com/recipes/complexSearch", [
                'type' => $tipo,
                'number' => $validated['number'] ?? 8,
                'apiKey' => $apiKey,
            ]);

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al consultar el servicio externo'
                ], 503);
            }

            return response()->json([
                'success' => true,
                'data' => $response->json()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al procesar la solicitud'
            ], 500);
        }
    }
}
