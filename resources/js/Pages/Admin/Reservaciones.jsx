import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function AdminReservaciones() {
    const [reservaciones, setReservaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('');

    useEffect(() => {
        cargarReservaciones();
    }, [filtroEstado]);

    const cargarReservaciones = async () => {
        setLoading(true);
        try {
            const params = filtroEstado ? { estado: filtroEstado } : {};
            const response = await axios.get('/api/admin/reservaciones', { params });
            console.log('Respuesta del servidor:', response.data);
            setReservaciones(response.data.data || []);
        } catch (error) {
            console.error('Error completo:', error);
            console.error('Respuesta del error:', error.response);
            if (error.response?.status === 403) {
                alert('No tienes permisos de administrador');
            } else if (error.response?.status === 401) {
                alert('No estás autenticado. Por favor inicia sesión.');
            } else {
                alert('Error al cargar reservaciones: ' + (error.response?.data?.message || error.message));
            }
        } finally {
            setLoading(false);
        }
    };

    const confirmarReservacion = async (id) => {
        try {
            await axios.put(`/api/admin/reservaciones/${id}/confirmar`);
            cargarReservaciones();
            alert('Reservación confirmada');
        } catch (error) {
            alert('Error al confirmar reservación');
        }
    };

    const cancelarReservacion = async (id) => {
        if (!confirm('¿Cancelar esta reservación?')) return;
        
        try {
            await axios.put(`/api/admin/reservaciones/${id}/cancelar`);
            cargarReservaciones();
            alert('Reservación cancelada');
        } catch (error) {
            alert('Error al cancelar reservación');
        }
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'confirmada': return 'bg-green-600';
            case 'cancelada': return 'bg-red-600';
            default: return 'bg-yellow-600';
        }
    };

    const getEstadoTexto = (estado) => {
        switch (estado) {
            case 'confirmada': return 'Confirmada';
            case 'cancelada': return 'Cancelada';
            default: return 'Pendiente';
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Reservaciones" />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 tracking-wide">
                                Gestión de Reservaciones
                            </h1>
                            <p className="text-gray-300 text-lg mt-2">
                                {reservaciones.length} reservaciones
                            </p>
                        </div>
                        <a
                            href="/admin"
                            className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
                        >
                            ← Volver al Panel
                        </a>
                    </div>

                    {/* Filtros */}
                    <div className="bg-gray-800/50 border-2 border-yellow-600/40 p-4 rounded mb-6">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setFiltroEstado('')}
                                className={`px-4 py-2 rounded ${!filtroEstado ? 'bg-yellow-600 text-black' : 'bg-gray-700 text-white'}`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setFiltroEstado('pendiente')}
                                className={`px-4 py-2 rounded ${filtroEstado === 'pendiente' ? 'bg-yellow-600 text-black' : 'bg-gray-700 text-white'}`}
                            >
                                Pendientes
                            </button>
                            <button
                                onClick={() => setFiltroEstado('confirmada')}
                                className={`px-4 py-2 rounded ${filtroEstado === 'confirmada' ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
                            >
                                Confirmadas
                            </button>
                            <button
                                onClick={() => setFiltroEstado('cancelada')}
                                className={`px-4 py-2 rounded ${filtroEstado === 'cancelada' ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'}`}
                            >
                                Canceladas
                            </button>
                        </div>
                    </div>

                    {/* Lista de Reservaciones */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                        </div>
                    ) : reservaciones.length > 0 ? (
                        <div className="space-y-4">
                            {reservaciones.map((reservacion) => (
                                <div 
                                    key={reservacion.id}
                                    className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded hover:border-yellow-500 transition-all"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <h3 className="text-xl font-serif text-yellow-500 mb-2">
                                                {reservacion.nombre_cliente}
                                            </h3>
                                            <span className={`inline-block px-3 py-1 rounded text-white text-sm ${getEstadoColor(reservacion.estado)}`}>
                                                {getEstadoTexto(reservacion.estado)}
                                            </span>
                                        </div>

                                        <div className="text-gray-300">
                                            <p className="mb-1">📅 {new Date(reservacion.fecha).toLocaleDateString('es-ES', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}</p>
                                            <p className="mb-1">🕐 {reservacion.hora}</p>
                                            <p>👥 {reservacion.numero_personas} personas</p>
                                        </div>

                                        <div className="text-gray-300">
                                            <p className="mb-1">📧 {reservacion.email}</p>
                                            <p className="mb-1">📞 {reservacion.telefono}</p>
                                            {reservacion.user && (
                                                <p className="text-sm text-gray-400">Usuario: {reservacion.user.name}</p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {reservacion.estado === 'pendiente' && (
                                                <>
                                                    <button
                                                        onClick={() => confirmarReservacion(reservacion.id)}
                                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                                                    >
                                                        ✓ Confirmar
                                                    </button>
                                                    <button
                                                        onClick={() => cancelarReservacion(reservacion.id)}
                                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                                    >
                                                        ✕ Cancelar
                                                    </button>
                                                </>
                                            )}
                                            {reservacion.estado === 'confirmada' && (
                                                <button
                                                    onClick={() => cancelarReservacion(reservacion.id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                                >
                                                    ✕ Cancelar
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {reservacion.notas && (
                                        <div className="mt-4 pt-4 border-t border-gray-700">
                                            <p className="text-gray-400 text-sm">
                                                <strong>Notas:</strong> {reservacion.notas}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No hay reservaciones</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
