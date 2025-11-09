import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function RecetaDetalle({ recetaId }) {
    const [receta, setReceta] = useState(null);
    const [valoracion, setValoracion] = useState(null);
    const [miValoracion, setMiValoracion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [esFavorita, setEsFavorita] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, [recetaId]);

    const cargarDatos = async () => {
        setLoading(true);
        try {
            // Cargar receta
            const recetaRes = await axios.get(`/api/recetas/detalle/${recetaId}`);
            setReceta(recetaRes.data.data);

            // Cargar valoración promedio
            const valoracionRes = await axios.get(`/api/valoraciones/${recetaId}/promedio`);
            setValoracion(valoracionRes.data.data);

            // Cargar mi valoración (si está autenticado)
            try {
                const miValRes = await axios.get(`/api/valoraciones/${recetaId}/mi-valoracion`);
                if (miValRes.data.data) {
                    setMiValoracion(miValRes.data.data.puntuacion);
                }
            } catch (e) {
                // No autenticado o sin valoración
            }

            // Verificar si es favorita
            try {
                const favRes = await axios.get(`/api/favoritas/check/${recetaId}`);
                setEsFavorita(favRes.data.is_favorite);
            } catch (e) {
                // No autenticado
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const valorar = async (puntuacion) => {
        try {
            await axios.post('/api/valoraciones', {
                receta_id: recetaId,
                puntuacion
            });
            setMiValoracion(puntuacion);
            cargarDatos(); // Recargar valoración
        } catch (error) {
            alert('Error al valorar');
        }
    };

    const toggleFavorita = async () => {
        try {
            if (esFavorita) {
                // Eliminar (necesitarías el ID de la favorita)
                alert('Funcionalidad de eliminar en desarrollo');
            } else {
                await axios.post('/api/favoritas', {
                    receta_id: recetaId,
                    nombre: receta.title,
                    imagen: receta.image,
                    tiempo: `${receta.readyInMinutes} min`,
                    descripcion: receta.summary?.substring(0, 200)
                });
                setEsFavorita(true);
            }
        } catch (error) {
            alert('Error al gestionar favorita');
        }
    };

    if (loading) {
        return (
            <AuthenticatedLayout>
                <div className="py-12 bg-gray-900 min-h-screen flex items-center justify-center">
                    <div className="text-white">Cargando...</div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={receta?.title || 'Receta'} />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Imagen y título */}
                    <div className="mb-8">
                        <img 
                            src={receta?.image} 
                            alt={receta?.title}
                            className="w-full h-96 object-cover rounded-lg mb-6"
                        />
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-4xl font-serif text-yellow-500 mb-4">{receta?.title}</h1>
                                <p className="text-gray-300">Tiempo: {receta?.readyInMinutes} minutos</p>
                            </div>
                            <button
                                onClick={toggleFavorita}
                                className={`px-6 py-3 rounded ${esFavorita ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-white'}`}
                            >
                                {esFavorita ? '★ Favorita' : '☆ Agregar a Favoritas'}
                            </button>
                        </div>
                    </div>

                    {/* Valoración */}
                    <div className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded mb-8">
                        <h3 className="text-2xl font-serif text-yellow-500 mb-4">Valoración</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-3xl text-yellow-500">
                                {valoracion?.promedio || 0} ★
                            </div>
                            <div className="text-gray-300">
                                ({valoracion?.total_valoraciones || 0} valoraciones)
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <p className="text-gray-300 mb-2">Tu valoración:</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => valorar(star)}
                                        className={`text-3xl ${star <= miValoracion ? 'text-yellow-500' : 'text-gray-600'} hover:text-yellow-400`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
