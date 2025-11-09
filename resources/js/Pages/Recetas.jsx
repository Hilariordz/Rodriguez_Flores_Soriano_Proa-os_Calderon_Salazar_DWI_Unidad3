import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Recetas() {
    const [categoriaActiva, setCategoriaActiva] = useState('all');
    const [recetas, setRecetas] = useState([]);
    const [loading, setLoading] = useState(false);

    const categorias = [
        { id: 'all', nombre: 'Todas', tipo: null },
        { id: 'breakfast', nombre: 'Desayuno', tipo: 'breakfast' },
        { id: 'lunch', nombre: 'Almuerzo', tipo: 'main course' },
        { id: 'dinner', nombre: 'Cena', tipo: 'main course' },
        { id: 'dessert', nombre: 'Postres', tipo: 'dessert' },
        { id: 'appetizer', nombre: 'Entradas', tipo: 'appetizer' },
        { id: 'snack', nombre: 'Snacks', tipo: 'snack' },
    ];

    useEffect(() => {
        cargarRecetas(categoriaActiva);
    }, [categoriaActiva]);

    const cargarRecetas = async (categoria) => {
        setLoading(true);
        try {
            let url;
            if (categoria === 'all') {
                url = '/api/recetas/aleatorias';
            } else {
                const cat = categorias.find(c => c.id === categoria);
                url = `/api/recetas/categoria/${cat.tipo}`;
            }
            
            const response = await axios.get(url);
            // Manejar la nueva estructura de respuesta con success y data
            const data = response.data.success ? response.data.data : response.data;
            setRecetas(data.results || data.recipes || []);
        } catch (error) {
            console.error('Error al cargar recetas:', error);
            setRecetas([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <img src="/images/BonAppétit-logo.png" alt="BonAppétit" className="h-8" />
                    <h2 className="font-serif text-2xl text-gray-800 tracking-wider">Nuestras Recetas</h2>
                </div>
            }
        >
            <Head title="Recetas">
                <link rel="icon" type="image/png" href="/images/BonAppétit-logo.png" />
            </Head>

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4 tracking-wide">Colección Gourmet</h1>
                        <p className="text-gray-300 text-lg">Explora nuestras recetas por categoría</p>
                    </div>

                    {/* Categorías */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                onClick={() => setCategoriaActiva(categoria.id)}
                                className={`px-6 py-3 font-medium uppercase tracking-wider transition-all duration-300 ${
                                    categoriaActiva === categoria.id
                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black'
                                        : 'bg-gray-800/50 border-2 border-yellow-600/30 text-gray-300 hover:border-yellow-500 hover:text-yellow-500'
                                }`}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                            <p className="text-gray-400 mt-4 font-serif">Cargando recetas...</p>
                        </div>
                    )}

                    {/* Recetas Grid */}
                    {!loading && recetas.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recetas.map((receta) => (
                                <div 
                                    key={receta.id} 
                                    className="bg-gray-800/30 border-2 border-yellow-600/40 overflow-hidden hover:border-yellow-500 transition-all duration-300 group"
                                >
                                    <div className="relative h-64 overflow-hidden bg-black">
                                        <img
                                            src={receta.image}
                                            alt={receta.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await axios.post('/api/favoritas', {
                                                        receta_id: receta.id,
                                                        nombre: receta.title,
                                                        imagen: receta.image,
                                                        tiempo: `${receta.readyInMinutes || 30} min`
                                                    });
                                                    alert('¡Agregado a favoritas!');
                                                } catch (error) {
                                                    if (error.response?.status === 409) {
                                                        alert('Ya está en favoritas');
                                                    } else {
                                                        alert('Error al agregar a favoritas');
                                                    }
                                                }
                                            }}
                                            className="absolute top-4 right-4 bg-black/70 hover:bg-yellow-600 text-yellow-500 hover:text-black p-3 rounded-full transition-all text-2xl"
                                        >
                                            ★
                                        </button>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="font-serif text-lg text-yellow-500 mb-4 uppercase tracking-wider line-clamp-2">
                                            {receta.title}
                                        </h3>
                                        <a 
                                            href={`/receta/${receta.id}`}
                                            className="text-yellow-600 hover:text-yellow-400 font-medium text-sm uppercase tracking-wider transition-colors border-b border-yellow-600/50 hover:border-yellow-400 pb-1"
                                        >
                                            View Recipe
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Sin resultados */}
                    {!loading && recetas.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-block p-12 bg-gray-800/30 border-2 border-yellow-600/40 mb-6">
                                <svg className="w-20 h-20 text-yellow-600/50 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <p className="text-gray-400 text-lg font-serif uppercase tracking-wider">No hay recetas disponibles</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
