<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    /**
     * Obtener menú público (solo items disponibles)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = MenuItem::where('disponible', true);

            // Filtro por categoría
            if ($request->has('categoria')) {
                $query->where('categoria', $request->categoria);
            }

            $items = $query->orderBy('categoria')->orderBy('nombre')->get();

            // Agrupar por categoría
            $menuAgrupado = $items->groupBy('categoria');

            return response()->json([
                'success' => true,
                'data' => $menuAgrupado,
                'total' => $items->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener menú'
            ], 500);
        }
    }

    /**
     * Obtener item específico del menú
     */
    public function show(int $id): JsonResponse
    {
        try {
            $item = MenuItem::where('disponible', true)->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $item
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Item no encontrado'
            ], 404);
        }
    }
}
