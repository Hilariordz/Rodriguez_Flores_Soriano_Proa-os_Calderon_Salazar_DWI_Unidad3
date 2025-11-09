<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorita extends Model
{
    protected $fillable = [
        'user_id',
        'receta_id',
        'nombre',
        'imagen',
        'tiempo',
        'descripcion',
        'precio'
    ];

    /**
     * Relación con el usuario
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
