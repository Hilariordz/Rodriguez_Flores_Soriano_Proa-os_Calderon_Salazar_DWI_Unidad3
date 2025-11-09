<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Valoracion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class ValoracionController extends Controller
{
    /**
     * Obtener valoración promedio de una receta
     */
    public function promedio(int $recetaId): JsonResponse
    {
        try {
            $stats = Valoracion::where('receta_id', $recetaId)
                ->select(
                    DB::raw('AVG(puntuacion) as promedio'),
                    DB::raw('COUNT(*) as total')
                )
                ->first();

            return response()->json([
                'success' => true,
                'data' => [
                    'receta_id' => $recetaId,
                    'promedio' => $stats->promedio ? round($stats->promedio, 1) : 0,
                    'total_valoraciones' => $stats->total
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener valoración'
            ], 500);
        }
    }

    /**
     * Obtener valoración del usuario para una receta
     */
    public function miValoracion(Request $request, int $recetaId): JsonResponse
    {
        try {
            $valoracion = Valoracion::where('user_id', $request->user()->id)
                ->where('receta_id', $recetaId)
                ->first();

            if (!$valoracion) {
                return response()->json([
                    'success' => true,
                    'data' => null,
                    'message' => 'No has valorado esta receta'
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => $valoracion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener tu valoración'
            ], 500);
        }
    }

    /**
     * Crear o actualizar valoración
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'receta_id' => 'required|integer',
            'puntuacion' => 'required|integer|min:1|max:5'
        ]);

        try {
            $valoracion = Valoracion::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'receta_id' => $validated['receta_id']
                ],
                [
                    'puntuacion' => $validated['puntuacion']
                ]
            );

            // Obtener nuevo promedio
            $stats = Valoracion::where('receta_id', $validated['receta_id'])
                ->select(
                    DB::raw('AVG(puntuacion) as promedio'),
                    DB::raw('COUNT(*) as total')
                )
                ->first();

            return response()->json([
                'success' => true,
                'message' => 'Valoración guardada',
                'data' => [
                    'valoracion' => $valoracion,
                    'promedio' => round($stats->promedio, 1),
                    'total_valoraciones' => $stats->total
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar valoración'
            ], 500);
        }
    }

    /**
     * Eliminar valoración
     */
    public function destroy(Request $request, int $recetaId): JsonResponse
    {
        try {
            $valoracion = Valoracion::where('user_id', $request->user()->id)
                ->where('receta_id', $recetaId)
                ->first();

            if (!$valoracion) {
                return response()->json([
                    'success' => false,
                    'message' => 'Valoración no encontrada'
                ], 404);
            }

            $valoracion->delete();

            return response()->json([
                'success' => true,
                'message' => 'Valoración eliminada'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar valoración'
            ], 500);
        }
    }

    /**
     * Obtener distribución de valoraciones de una receta
     */
    public function distribucion(int $recetaId): JsonResponse
    {
        try {
            $distribucion = Valoracion::where('receta_id', $recetaId)
                ->select('puntuacion', DB::raw('COUNT(*) as cantidad'))
                ->groupBy('puntuacion')
                ->orderBy('puntuacion', 'desc')
                ->get()
                ->pluck('cantidad', 'puntuacion');

            // Asegurar que todas las puntuaciones estén presentes
            $resultado = [];
            for ($i = 5; $i >= 1; $i--) {
                $resultado[$i] = $distribucion->get($i, 0);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'receta_id' => $recetaId,
                    'distribucion' => $resultado,
                    'total' => array_sum($resultado)
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener distribución'
            ], 500);
        }
    }
}
