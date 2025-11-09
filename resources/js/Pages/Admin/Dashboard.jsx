import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    const cargarEstadisticas = async () => {
        try {
            const response = await axios.get('/api/admin/reservaciones/estadisticas');
            setStats(response.data.data);
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Panel de Administrador" />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 mb-4 tracking-wide">
                            Panel de Administrador
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Gestiona reservaciones y el menú del restaurante
                        </p>
                    </div>

                    {/* Estadísticas */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                        </div>
                    ) : stats && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded">
                                <h3 className="text-gray-400 text-sm uppercase mb-2">Total Reservaciones</h3>
                                <p className="text-4xl font-bold text-yellow-500">{stats.total}</p>
                            </div>
                            <div className="bg-gray-800/50 border-2 border-blue-600/40 p-6 rounded">
                                <h3 className="text-gray-400 text-sm uppercase mb-2">Pendientes</h3>
                                <p className="text-4xl font-bold text-blue-500">{stats.pendientes}</p>
                            </div>
                            <div className="bg-gray-800/50 border-2 border-green-600/40 p-6 rounded">
                                <h3 className="text-gray-400 text-sm uppercase mb-2">Confirmadas</h3>
                                <p className="text-4xl font-bold text-green-500">{stats.confirmadas}</p>
                            </div>
                            <div className="bg-gray-800/50 border-2 border-red-600/40 p-6 rounded">
                                <h3 className="text-gray-400 text-sm uppercase mb-2">Hoy</h3>
                                <p className="text-4xl font-bold text-red-500">{stats.hoy}</p>
                            </div>
                        </div>
                    )}

                    {/* Accesos rápidos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <a
                            href="/admin/reservaciones"
                            className="bg-gray-800/50 border-2 border-yellow-600/40 p-8 rounded hover:border-yellow-500 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-serif text-yellow-500 mb-2">Gestionar Reservaciones</h3>
                                    <p className="text-gray-400">Ver y administrar todas las reservaciones</p>
                                </div>
                                <svg className="w-12 h-12 text-yellow-500 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>

                        <a
                            href="/admin/menu"
                            className="bg-gray-800/50 border-2 border-yellow-600/40 p-8 rounded hover:border-yellow-500 transition-all group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-serif text-yellow-500 mb-2">Gestionar Menú</h3>
                                    <p className="text-gray-400">Agregar y editar platillos del menú</p>
                                </div>
                                <svg className="w-12 h-12 text-yellow-500 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
