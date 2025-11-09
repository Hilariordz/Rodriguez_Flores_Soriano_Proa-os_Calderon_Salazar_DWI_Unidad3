import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function MisReservaciones() {
    const [reservaciones, setReservaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        email: '',
        telefono: '',
        numero_personas: 2,
        fecha: '',
        hora: '',
        notas: ''
    });

    useEffect(() => {
        cargarReservaciones();
    }, []);

    const cargarReservaciones = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/reservaciones');
            setReservaciones(response.data.data);
        } catch (error) {
            console.error('Error al cargar reservaciones:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reservaciones', formData);
            setMostrarFormulario(false);
            setFormData({
                nombre_cliente: '',
                email: '',
                telefono: '',
                numero_personas: 2,
                fecha: '',
                hora: '',
                notas: ''
            });
            cargarReservaciones();
            alert('Reservación creada exitosamente');
        } catch (error) {
            alert('Error al crear reservación: ' + (error.response?.data?.message || 'Error desconocido'));
        }
    };

    const cancelarReservacion = async (id) => {
        if (!confirm('¿Cancelar esta reservación?')) return;

        try {
            await axios.put(`/api/reservaciones/${id}/cancelar`);
            cargarReservaciones();
        } catch (error) {
            alert('Error al cancelar reservación');
        }
    };

    const eliminarReservacion = async (id) => {
        if (!confirm('¿Eliminar esta reservación?')) return;

        try {
            await axios.delete(`/api/reservaciones/${id}`);
            setReservaciones(reservaciones.filter(r => r.id !== id));
        } catch (error) {
            alert('Error al eliminar reservación');
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
            <Head title="Mis Reservaciones" />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header con botón */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 tracking-wide">
                                Mis Reservaciones
                            </h1>
                            <p className="text-gray-300 text-lg mt-2">
                                {reservaciones.length} {reservaciones.length === 1 ? 'reservación' : 'reservaciones'}
                            </p>
                        </div>
                        <button
                            onClick={() => setMostrarFormulario(!mostrarFormulario)}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded hover:from-yellow-400 hover:to-yellow-500"
                        >
                            {mostrarFormulario ? 'Cancelar' : '+ Nueva Reservación'}
                        </button>
                    </div>
                    
                    {/* Formulario de Nueva Reservación */}
                    {mostrarFormulario && (
                        <div className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded mb-8">
                            <h3 className="text-2xl font-serif text-yellow-500 mb-6">Nueva Reservación</h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nombre_cliente}
                                        onChange={(e) => setFormData({...formData, nombre_cliente: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Teléfono *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.telefono}
                                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Número de Personas *</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        max="20"
                                        value={formData.numero_personas}
                                        onChange={(e) => setFormData({...formData, numero_personas: parseInt(e.target.value)})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Fecha *</label>
                                    <input
                                        type="date"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                        value={formData.fecha}
                                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Hora *</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.hora}
                                        onChange={(e) => setFormData({...formData, hora: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-300 mb-2">Notas Especiales</label>
                                    <textarea
                                        value={formData.notas}
                                        onChange={(e) => setFormData({...formData, notas: e.target.value})}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                        placeholder="Alergias, preferencias de mesa, etc."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded hover:from-yellow-400 hover:to-yellow-500"
                                    >
                                        Crear Reservación
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Lista de Reservaciones */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                            <p className="text-gray-400 mt-4 font-serif">Cargando reservaciones...</p>
                        </div>
                    ) : reservaciones.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reservaciones.map((reservacion) => (
                                <div 
                                    key={reservacion.id}
                                    className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded hover:border-yellow-500 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-serif text-yellow-500 mb-2">
                                                {reservacion.nombre_cliente}
                                            </h3>
                                            <span className={`inline-block px-3 py-1 rounded text-white text-sm ${getEstadoColor(reservacion.estado)}`}>
                                                {getEstadoTexto(reservacion.estado)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-gray-300 mb-4">
                                        <p>📅 {new Date(reservacion.fecha).toLocaleDateString('es-ES', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}</p>
                                        <p>🕐 {reservacion.hora}</p>
                                        <p>👥 {reservacion.numero_personas} {reservacion.numero_personas === 1 ? 'persona' : 'personas'}</p>
                                        <p>📧 {reservacion.email}</p>
                                        <p>📞 {reservacion.telefono}</p>
                                        {reservacion.notas && (
                                            <p className="text-sm italic">💬 {reservacion.notas}</p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {reservacion.estado === 'pendiente' && (
                                            <button
                                                onClick={() => cancelarReservacion(reservacion.id)}
                                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                        <button
                                            onClick={() => eliminarReservacion(reservacion.id)}
                                            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-block p-12 bg-gray-800/30 border-2 border-yellow-600/40 mb-6">
                                <svg className="w-20 h-20 text-yellow-600/50 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-400 text-lg font-serif uppercase tracking-wider mb-4">
                                    No tienes reservaciones
                                </p>
                                <button
                                    onClick={() => setMostrarFormulario(true)}
                                    className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium hover:from-yellow-400 hover:to-yellow-500"
                                >
                                    Crear Reservación
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
