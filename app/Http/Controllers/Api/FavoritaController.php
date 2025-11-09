<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorita;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class FavoritaController extends Controller
{
    /**
     * Obtener todas las recetas favoritas del usuario autenticado
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $favoritas = Favorita::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $favoritas,
                'total' => $favoritas->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener favoritas'
            ], 500);
        }
    }

    /**
     * Obtener una favorita específica
     */
    public function show(Request $request, int $id): JsonResponse
    {
        try {
            $favorita = Favorita::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$favorita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Favorita no encontrada'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $favorita
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la favorita'
            ], 500);
        }
    }

    /**
     * Agregar una receta a favoritas
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'receta_id' => 'required|integer',
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|string|max:500',
            'tiempo' => 'nullable|string|max:50',
            'descripcion' => 'nullable|string|max:500',
            'precio' => 'nullable|string|max:50'
        ]);

        try {
            $favorita = Favorita::create([
                'user_id' => $request->user()->id,
                'receta_id' => $validated['receta_id'],
                'nombre' => $validated['nombre'],
                'imagen' => $validated['imagen'] ?? null,
                'tiempo' => $validated['tiempo'] ?? null,
                'descripcion' => $validated['descripcion'] ?? null,
                'precio' => $validated['precio'] ?? null
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Receta agregada a favoritas',
                'data' => $favorita
            ], 201);
        } catch (QueryException $e) {
            // Error de duplicado
            if ($e->getCode() == 23000) {
                return response()->json([
                    'success' => false,
                    'message' => 'Esta receta ya está en tus favoritas'
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Error al agregar a favoritas'
            ], 500);
        }
    }

    /**
     * Actualizar una favorita
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'imagen' => 'sometimes|nullable|string|max:500',
            'tiempo' => 'sometimes|nullable|string|max:50',
            'descripcion' => 'sometimes|nullable|string|max:500',
            'precio' => 'sometimes|nullable|string|max:50'
        ]);

        try {
            $favorita = Favorita::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$favorita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Favorita no encontrada'
                ], 404);
            }

            $favorita->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Favorita actualizada',
                'data' => $favorita
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar favorita'
            ], 500);
        }
    }

    /**
     * Eliminar una receta de favoritas
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $favorita = Favorita::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$favorita) {
                return response()->json([
                    'success' => false,
                    'message' => 'Favorita no encontrada'
                ], 404);
            }

            $favorita->delete();

            return response()->json([
                'success' => true,
                'message' => 'Receta eliminada de favoritas'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar favorita'
            ], 500);
        }
    }

    /**
     * Verificar si una receta está en favoritas
     */
    public function check(Request $request, int $recetaId): JsonResponse
    {
        try {
            $existe = Favorita::where('user_id', $request->user()->id)
                ->where('receta_id', $recetaId)
                ->exists();

            return response()->json([
                'success' => true,
                'is_favorite' => $existe
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al verificar favorita'
            ], 500);
        }
    }
}
