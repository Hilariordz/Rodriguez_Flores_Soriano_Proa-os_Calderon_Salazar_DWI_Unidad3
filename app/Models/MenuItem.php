<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'categoria',
        'precio',
        'imagen',
        'tiempo_preparacion',
        'disponible'
    ];

    protected $casts = [
        'precio' => 'decimal:2',
        'disponible' => 'boolean'
    ];
}
