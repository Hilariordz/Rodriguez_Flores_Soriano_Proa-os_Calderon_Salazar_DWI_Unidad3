<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservacion;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ReservacionAdminController extends Controller
{
    /**
     * Obtener todas las reservaciones (admin)
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Reservacion::with('user:id,name,email')
                ->orderBy('fecha', 'desc')
                ->orderBy('hora', 'desc');

            // Filtros opcionales
            if ($request->has('estado')) {
                $query->where('estado', $request->estado);
            }

            if ($request->has('fecha')) {
                $query->whereDate('fecha', $request->fecha);
            }

            $reservaciones = $query->paginate(20);

            return response()->json([
                'success' => true,
                'data' => $reservaciones->items(),
                'pagination' => [
                    'current_page' => $reservaciones->currentPage(),
                    'total_pages' => $reservaciones->lastPage(),
                    'total' => $reservaciones->total(),
                    'per_page' => $reservaciones->perPage()
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener reservaciones'
            ], 500);
        }
    }

    /**
     * Confirmar una reservación
     */
    public function confirmar(int $id): JsonResponse
    {
        try {
            $reservacion = Reservacion::findOrFail($id);

            if ($reservacion->estado === 'cancelada') {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede confirmar una reservación cancelada'
                ], 400);
            }

            $reservacion->update(['estado' => 'confirmada']);

            return response()->json([
                'success' => true,
                'message' => 'Reservación confirmada',
                'data' => $reservacion->load('user:id,name,email')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al confirmar reservación'
            ], 500);
        }
    }

    /**
     * Cancelar una reservación (admin)
     */
    public function cancelar(int $id): JsonResponse
    {
        try {
            $reservacion = Reservacion::findOrFail($id);

            $reservacion->update(['estado' => 'cancelada']);

            return response()->json([
                'success' => true,
                'message' => 'Reservación cancelada',
                'data' => $reservacion->load('user:id,name,email')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al cancelar reservación'
            ], 500);
        }
    }

    /**
     * Estadísticas de reservaciones
     */
    public function estadisticas(): JsonResponse
    {
        try {
            $stats = [
                'total' => Reservacion::count(),
                'pendientes' => Reservacion::where('estado', 'pendiente')->count(),
                'confirmadas' => Reservacion::where('estado', 'confirmada')->count(),
                'canceladas' => Reservacion::where('estado', 'cancelada')->count(),
                'hoy' => Reservacion::whereDate('fecha', today())->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener estadísticas'
            ], 500);
        }
    }
}
