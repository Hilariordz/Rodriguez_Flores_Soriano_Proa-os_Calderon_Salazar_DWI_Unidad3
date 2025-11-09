<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReservacionController extends Controller
{
    /**
     * Obtener todas las reservaciones del usuario
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $reservaciones = Reservacion::where('user_id', $request->user()->id)
                ->orderBy('fecha', 'desc')
                ->orderBy('hora', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $reservaciones,
                'total' => $reservaciones->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener reservaciones'
            ], 500);
        }
    }

    /**
     * Crear una nueva reservación
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre_cliente' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefono' => 'required|string|max:20',
            'numero_personas' => 'required|integer|min:1|max:20',
            'fecha' => 'required|date|after_or_equal:today',
            'hora' => 'required|date_format:H:i',
            'notas' => 'nullable|string|max:500'
        ]);

        try {
            $reservacion = Reservacion::create([
                'user_id' => $request->user()->id,
                'nombre_cliente' => $validated['nombre_cliente'],
                'email' => $validated['email'],
                'telefono' => $validated['telefono'],
                'numero_personas' => $validated['numero_personas'],
                'fecha' => $validated['fecha'],
                'hora' => $validated['hora'],
                'notas' => $validated['notas'] ?? null,
                'estado' => 'pendiente'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Reservación creada exitosamente',
                'data' => $reservacion
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al crear reservación'
            ], 500);
        }
    }

    /**
     * Actualizar una reservación
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'nombre_cliente' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'telefono' => 'sometimes|string|max:20',
            'numero_personas' => 'sometimes|integer|min:1|max:20',
            'fecha' => 'sometimes|date|after_or_equal:today',
            'hora' => 'sometimes|date_format:H:i',
            'notas' => 'nullable|string|max:500'
        ]);

        try {
            $reservacion = Reservacion::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$reservacion) {
                return response()->json([
                    'success' => false,
                    'message' => 'Reservación no encontrada'
                ], 404);
            }

            if ($reservacion->estado === 'cancelada') {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede modificar una reservación cancelada'
                ], 400);
            }

            $reservacion->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Reservación actualizada',
                'data' => $reservacion
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar reservación'
            ], 500);
        }
    }

    /**
     * Cancelar una reservación
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        try {
            $reservacion = Reservacion::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$reservacion) {
                return response()->json([
                    'success' => false,
                    'message' => 'Reservación no encontrada'
                ], 404);
            }

            if ($reservacion->estado === 'cancelada') {
                return response()->json([
                    'success' => false,
                    'message' => 'La reservación ya está cancelada'
                ], 400);
            }

            $reservacion->update(['estado' => 'cancelada']);

            return response()->json([
                'success' => true,
                'message' => 'Reservación cancelada'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cancelar reservación'
            ], 500);
        }
    }

    /**
     * Eliminar una reservación
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        try {
            $reservacion = Reservacion::where('user_id', $request->user()->id)
                ->where('id', $id)
                ->first();

            if (!$reservacion) {
                return response()->json([
                    'success' => false,
                    'message' => 'Reservación no encontrada'
                ], 404);
            }

            $reservacion->delete();

            return response()->json([
                'success' => true,
                'message' => 'Reservación eliminada'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar reservación'
            ], 500);
        }
    }
}
