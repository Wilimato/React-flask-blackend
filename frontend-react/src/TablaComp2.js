import React, { useState, useEffect } from 'react';
import "./tablaStyle.css"

function TablaComp2({ updateTabla }) {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/data');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [updateTabla]);

    const handleDelete = async (id) => {
        // Mostrar alerta de confirmación antes de eliminar
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) {
            return;
        }

        // Llamada a la API para eliminar el producto por ID
        try {
            await fetch(`http://127.0.0.1:5000/api/data/${id}`, {
                method: 'DELETE',
            });
            // Actualizar la lista de datos después de la eliminación
            fetchData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            {data && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>SKU</th>
                            <th>Descripción</th>
                            <th>Vendido</th>
                            <th>Stock Disponible</th>
                            <th>Fecha de registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {item.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                                <td>
                                    {/* Botón de eliminación con función handleDelete */}
                                    <button onClick={() => handleDelete(item[0])}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay datos disponibles</p>
            )}
        </div>
    );
}

export default TablaComp2;
