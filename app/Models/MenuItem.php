<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
//Clase utilizada
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
