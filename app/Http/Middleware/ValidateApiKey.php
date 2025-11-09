<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateApiKey
{
    /**
     * Validar que la API key de Spoonacular esté configurada
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = env('SPOONACULAR_KEY');
        
        if (empty($apiKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Servicio no disponible: API key no configurada'
            ], 503);
        }

        return $next($request);
    }
}
