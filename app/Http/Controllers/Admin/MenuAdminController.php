<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MenuAdminController extends Controller
{
    /**
     * Listar todos los items del menú
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = MenuItem::query();

            // Filtro por categoría
            if ($request->has('categoria')) {
                $query->where('categoria', $request->categoria);
            }

            // Filtro por disponibilidad
            if ($request->has('disponible')) {
                $query->where('disponible', $request->boolean('disponible'));
            }

            $items = $query->orderBy('categoria')->orderBy('nombre')->get();

            return response()->json([
                'success' => true,
                'data' => $items,
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
     * Crear nuevo item del menú
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'required|in:entrada,plato_fuerte,postre,bebida',
            'precio' => 'required|numeric|min:0',
            'imagen' => 'nullable|string|max:500',
            'tiempo_preparacion' => 'nullable|string|max:50',
            'disponible' => 'boolean'
        ]);

        try {
            $item = MenuItem::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Item agregado al menú',
                'data' => $item
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear item'
            ], 500);
        }
    }

    /**
     * Actualizar item del menú
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'sometimes|string|max:255',
            'descripcion' => 'nullable|string',
            'categoria' => 'sometimes|in:entrada,plato_fuerte,postre,bebida',
            'precio' => 'sometimes|numeric|min:0',
            'imagen' => 'nullable|string|max:500',
            'tiempo_preparacion' => 'nullable|string|max:50',
            'disponible' => 'boolean'
        ]);

        try {
            $item = MenuItem::findOrFail($id);
            $item->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Item actualizado',
                'data' => $item
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar item'
            ], 500);
        }
    }

    /**
     * Eliminar item del menú
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $item = MenuItem::findOrFail($id);
            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Item eliminado del menú'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar item'
            ], 500);
        }
    }

    /**
     * Cambiar disponibilidad de un item
     */
    public function toggleDisponibilidad(int $id): JsonResponse
    {
        try {
            $item = MenuItem::findOrFail($id);
            $item->update(['disponible' => !$item->disponible]);

            return response()->json([
                'success' => true,
                'message' => $item->disponible ? 'Item disponible' : 'Item no disponible',
                'data' => $item
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cambiar disponibilidad'
            ], 500);
        }
    }
}
