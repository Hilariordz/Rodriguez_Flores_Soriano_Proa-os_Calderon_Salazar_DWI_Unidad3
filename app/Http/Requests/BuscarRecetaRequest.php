<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class BuscarRecetaRequest extends FormRequest
{
    /**
     * Determinar si el usuario está autorizado para hacer esta petición
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación
     */
    public function rules(): array
    {
        return [
            'query' => [
                'required',
                'string',
                'min:2',
                'max:100',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/' // Solo letras y espacios
            ],
            'number' => 'nullable|integer|min:1|max:20'
        ];
    }

    /**
     * Mensajes de error personalizados
     */
    public function messages(): array
    {
        return [
            'query.required' => 'El término de búsqueda es obligatorio',
            'query.min' => 'El término debe tener al menos 2 caracteres',
            'query.max' => 'El término no puede exceder 100 caracteres',
            'query.regex' => 'El término solo puede contener letras y espacios',
            'number.integer' => 'El número debe ser un valor entero',
            'number.min' => 'El número mínimo es 1',
            'number.max' => 'El número máximo es 20'
        ];
    }

    /**
     * Manejar validación fallida
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422)
        );
    }
}
