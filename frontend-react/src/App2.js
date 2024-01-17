import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [sku, setSku] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ventas_por_dia, setVenta] = useState('');
    const [stock_total, setStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realiza una solicitud POST al backend Flask
            await axios.post('http://127.0.0.1:5000/api/data', {
                sku: sku,
                descripcion: descripcion,
                ventas_por_dia: ventas_por_dia,
                stock_total: stock_total,
            });

            // Limpiar el formulario después de enviar los datos
            setSku('');
            setDescripcion('');
            setVenta('');
            setStock('');

            alert('Usuario agregado correctamente');
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    return (
        <div className="App">
            <h1>Agregar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>SKU:</label>
                <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    required
                />
                <br />

                <label>Descripción:</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <br />
                <label>Edad:</label>
                <input
                    type="number"
                    value={ventas_por_dia}
                    onChange={(e) => setVenta(e.target.value)}
                    required
                />
                <br />
                <label>Stock total:</label>
                <input
                    type="number"
                    value={stock_total}
                    onChange={(e) => setStock(e.target.value)}
                    required
                />
                <br />

                <button type="submit">Agregar Usuario</button>
            </form>
        </div>
    );
}

export default App;