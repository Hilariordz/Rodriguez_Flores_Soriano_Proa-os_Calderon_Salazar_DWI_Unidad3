import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

export default function AdminMenu() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        categoria: 'plato_fuerte',
        precio: '',
        imagen: '',
        tiempo_preparacion: '',
        disponible: true
    });

    useEffect(() => {
        cargarMenu();
    }, []);

    const cargarMenu = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/admin/menu');
            setItems(response.data.data);
        } catch (error) {
            console.error('Error al cargar menú:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await axios.put(`/api/admin/menu/${editando}`, formData);
                alert('Item actualizado');
            } else {
                await axios.post('/api/admin/menu', formData);
                alert('Item agregado al menú');
            }
            resetForm();
            cargarMenu();
        } catch (error) {
            alert('Error al guardar item');
        }
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            categoria: 'plato_fuerte',
            precio: '',
            imagen: '',
            tiempo_preparacion: '',
            disponible: true
        });
        setEditando(null);
        setMostrarFormulario(false);
    };

    const editarItem = (item) => {
        setFormData({
            nombre: item.nombre,
            descripcion: item.descripcion || '',
            categoria: item.categoria,
            precio: item.precio,
            imagen: item.imagen || '',
            tiempo_preparacion: item.tiempo_preparacion || '',
            disponible: item.disponible
        });
        setEditando(item.id);
        setMostrarFormulario(true);
    };

    const eliminarItem = async (id) => {
        if (!confirm('¿Eliminar este item del menú?')) return;
        
        try {
            await axios.delete(`/api/admin/menu/${id}`);
            cargarMenu();
            alert('Item eliminado');
        } catch (error) {
            alert('Error al eliminar item');
        }
    };

    const toggleDisponibilidad = async (id) => {
        try {
            await axios.put(`/api/admin/menu/${id}/toggle-disponibilidad`);
            cargarMenu();
        } catch (error) {
            alert('Error al cambiar disponibilidad');
        }
    };

    const categorias = [
        { value: 'entrada', label: 'Entrada' },
        { value: 'plato_fuerte', label: 'Plato Fuerte' },
        { value: 'postre', label: 'Postre' },
        { value: 'bebida', label: 'Bebida' }
    ];

    const getCategoriaLabel = (categoria) => {
        return categorias.find(c => c.value === categoria)?.label || categoria;
    };

    return (
        <AuthenticatedLayout>
            <Head title="Gestión de Menú" />

            <div className="py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif text-yellow-500 tracking-wide">
                                Gestión de Menú
                            </h1>
                            <p className="text-gray-300 text-lg mt-2">
                                {items.length} items en el menú
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded hover:from-yellow-400 hover:to-yellow-500"
                            >
                                {mostrarFormulario ? 'Cancelar' : '+ Agregar Item'}
                            </button>
                            <a
                                href="/admin"
                                className="px-6 py-3 bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                                ← Volver
                            </a>
                        </div>
                    </div>

                    {/* Formulario */}
                    {mostrarFormulario && (
                        <div className="bg-gray-800/50 border-2 border-yellow-600/40 p-6 rounded mb-8">
                            <h3 className="text-2xl font-serif text-yellow-500 mb-6">
                                {editando ? 'Editar Item' : 'Nuevo Item'}
                            </h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Nombre *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nombre}
                                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Categoría *</label>
                                    <select
                                        required
                                        value={formData.categoria}
                                        onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    >
                                        {categorias.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Precio *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={formData.precio}
                                        onChange={(e) => setFormData({...formData, precio: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Tiempo de Preparación</label>
                                    <input
                                        type="text"
                                        value={formData.tiempo_preparacion}
                                        onChange={(e) => setFormData({...formData, tiempo_preparacion: e.target.value})}
                                        placeholder="ej: 20 min"
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-300 mb-2">Descripción</label>
                                    <textarea
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-300 mb-2">URL de Imagen</label>
                                    <input
                                        type="text"
                                        value={formData.imagen}
                                        onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                                        placeholder="https://..."
                                        className="w-full px-4 py-2 bg-gray-700 text-white border-2 border-yellow-600/30 rounded focus:border-yellow-500 focus:outline-none"
                                    />
                                </div>
                                <div className="md:col-span-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.disponible}
                                        onChange={(e) => setFormData({...formData, disponible: e.target.checked})}
                                        className="w-5 h-5"
                                    />
                                    <label className="text-gray-300">Disponible</label>
                                </div>
                                <div className="md:col-span-2 flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium rounded hover:from-yellow-400 hover:to-yellow-500"
                                    >
                                        {editando ? 'Actualizar' : 'Agregar'}
                                    </button>
                                    {editando && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Lista de Items */}
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div 
                                    key={item.id}
                                    className={`bg-gray-800/50 border-2 ${item.disponible ? 'border-yellow-600/40' : 'border-gray-600/40'} p-6 rounded`}
                                >
                                    {item.imagen && (
                                        <img 
                                            src={item.imagen} 
                                            alt={item.nombre}
                                            className="w-full h-48 object-cover rounded mb-4"
                                        />
                                    )}
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-serif text-yellow-500">{item.nombre}</h3>
                                        <span className={`px-2 py-1 rounded text-xs ${item.disponible ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                                            {item.disponible ? 'Disponible' : 'No disponible'}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-2">{getCategoriaLabel(item.categoria)}</p>
                                    {item.descripcion && (
                                        <p className="text-gray-300 text-sm mb-3">{item.descripcion}</p>
                                    )}
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-2xl font-bold text-yellow-500">${item.precio}</span>
                                        {item.tiempo_preparacion && (
                                            <span className="text-gray-400 text-sm">⏱️ {item.tiempo_preparacion}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => editarItem(item)}
                                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => toggleDisponibilidad(item.id)}
                                            className="flex-1 px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-500 text-sm"
                                        >
                                            {item.disponible ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                        <button
                                            onClick={() => eliminarItem(item.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 text-sm"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
