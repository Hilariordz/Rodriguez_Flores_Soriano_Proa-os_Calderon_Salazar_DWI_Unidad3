<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservacion extends Model
{
    protected $table = 'reservaciones';
    
    protected $fillable = [
        'user_id',
        'nombre_cliente',
        'email',
        'telefono',
        'numero_personas',
        'fecha',
        'hora',
        'notas',
        'estado'
    ];

    protected $casts = [
        'fecha' => 'date',
        'numero_personas' => 'integer'
    ];

    /**
     * Relación con el usuario
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
