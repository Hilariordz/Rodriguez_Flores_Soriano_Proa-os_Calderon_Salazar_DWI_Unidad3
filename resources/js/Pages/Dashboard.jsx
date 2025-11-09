import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function Dashboard({ recetas = [] }) {
    const [query, setQuery] = useState('');
    const [favoritas, setFavoritas] = useState([]);

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard">
                <link rel="icon" type="image/png" href="/images/BonAppétit-logo.png" />
            </Head>

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4 tracking-wide">Descubre Recetas Exquisitas</h1>
                        <p className="text-gray-300 text-lg">Explora nuestra colección de recetas gourmet</p>
                    </div>

                    {/* Formulario de búsqueda */}
                    <form method="GET" action="/buscar" className="max-w-3xl mx-auto mb-16">
                        <div className="relative">
                            <input
                                name="query"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Busca pasta, pollo, ensalada..."
                                className="w-full px-6 py-4 bg-gray-800/50 border-2 border-yellow-600/30 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                            />
                            <button 
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 relative overflow-hidden px-8 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium transition-all duration-300 group hover:from-yellow-400 hover:to-yellow-500"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                                <span className="relative z-10">Buscar</span>
                            </button>
                        </div>
                    </form>

                    {/* Resultados */}
                    {recetas.results ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recetas.results.map((receta) => (
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
                                            className="absolute top-4 right-4 bg-black/70 hover:bg-yellow-600 text-yellow-500 hover:text-black p-3 rounded-full transition-all"
                                        >
                                            ★
                                        </button>
                                    </div>
                                    <div className="p-6 text-center">
                                        <h3 className="font-serif text-lg text-yellow-500 mb-4 uppercase tracking-wider line-clamp-2">{receta.title}</h3>
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
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-block p-12 bg-gray-800/30 border-2 border-yellow-600/40 mb-6">
                                <svg className="w-20 h-20 text-yellow-600/50 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-gray-400 text-lg font-serif uppercase tracking-wider">Escribe algo para buscar recetas deliciosas</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
