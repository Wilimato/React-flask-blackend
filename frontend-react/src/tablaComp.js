import React, { useState, useEffect } from 'react';
import "./tablaStyle.css"

function TablaComp({ updateTabla }) {
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
                            <th>Fecha de regristo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapear datos recuperados y mostrarlos en la tabla */}
                        {data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {item.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
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

export default TablaComp;
