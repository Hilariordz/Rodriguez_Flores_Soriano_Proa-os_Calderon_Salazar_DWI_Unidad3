import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function MisFavoritas() {
    const [favoritas, setFavoritas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarFavoritas();
    }, []);

    const cargarFavoritas = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/favoritas');
            setFavoritas(response.data.data);
        } catch (error) {
            console.error('Error al cargar favoritas:', error);
        } finally {
            setLoading(false);
        }
    };

    const eliminarFavorita = async (id) => {
        if (!confirm('¿Eliminar esta receta de favoritas?')) return;

        try {
            await axios.delete(`/api/favoritas/${id}`);
            setFavoritas(favoritas.filter(f => f.id !== id));
        } catch (error) {
            alert('Error al eliminar favorita');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <img src="/images/BonAppétit-logo.png" alt="BonAppétit" className="h-8" />
                    <h2 className="font-serif text-2xl text-gray-800 tracking-wider">Mis Favoritas</h2>
                </div>
            }
        >
            <Head title="Mis Favoritas" />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4 tracking-wide">
                            Mis Recetas Favoritas
                        </h1>
                        <p className="text-gray-300 text-lg">
                            {favoritas.length} {favoritas.length === 1 ? 'receta guardada' : 'recetas guardadas'}
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                            <p className="text-gray-400 mt-4 font-serif">Cargando favoritas...</p>
                        </div>
                    ) : favoritas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {favoritas.map((favorita) => (
                                <div 
                                    key={favorita.id} 
                                    className="bg-gray-800/30 border-2 border-yellow-600/40 overflow-hidden hover:border-yellow-500 transition-all duration-300 group"
                                >
                                    <div className="relative h-64 overflow-hidden bg-black">
                                        {favorita.imagen ? (
                                            <img
                                                src={favorita.imagen}
                                                alt={favorita.nombre}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                                <span className="text-gray-500 text-4xl">🍽️</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-serif text-lg text-yellow-500 mb-2 uppercase tracking-wider line-clamp-2">
                                            {favorita.nombre}
                                        </h3>
                                        {favorita.tiempo && (
                                            <p className="text-gray-400 text-sm mb-2">⏱️ {favorita.tiempo}</p>
                                        )}
                                        {favorita.descripcion && (
                                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                                {favorita.descripcion}
                                            </p>
                                        )}
                                        {favorita.precio && (
                                            <p className="text-yellow-500 font-bold mb-4">{favorita.precio}</p>
                                        )}
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => window.location.href = `/receta/${favorita.receta_id}`}
                                                className="flex-1 text-yellow-600 hover:text-yellow-400 font-medium text-sm uppercase tracking-wider transition-colors border border-yellow-600/50 hover:border-yellow-400 py-2"
                                            >
                                                Ver Receta
                                            </button>
                                            <button
                                                onClick={() => eliminarFavorita(favorita.id)}
                                                className="px-4 text-red-500 hover:text-red-400 font-medium text-sm uppercase tracking-wider transition-colors border border-red-500/50 hover:border-red-400 py-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-block p-12 bg-gray-800/30 border-2 border-yellow-600/40 mb-6">
                                <svg className="w-20 h-20 text-yellow-600/50 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <p className="text-gray-400 text-lg font-serif uppercase tracking-wider mb-4">
                                    No tienes favoritas aún
                                </p>
                                <a 
                                    href="/recetas"
                                    className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium hover:from-yellow-400 hover:to-yellow-500"
                                >
                                    Explorar Recetas
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
