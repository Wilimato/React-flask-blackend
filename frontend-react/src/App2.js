import React, { useState } from 'react';
import axios from 'axios';
import "./formStyle.css"
import TablaComp2 from './TablaComp2';
function App() {
    const [sku, setSku] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [ventas_por_dia, setVenta] = useState('');
    const [stock_total, setStock] = useState('');
    const [updateTabla, setUpdateTable] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            setUpdateTable(true)
        } catch (error) {
            console.error('Error al enviar datos al backend:', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="card card-login mx-auto text-center bg-dark">
                    <div className="card-header mx-auto bg-dark">
                        <span className="logo_title mt-5"> Registro de Productos </span>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='text-white m-2'>SKU:</label>
                                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)}
                                    required className="form-control" placeholder="sku"></input>
                            </div>

                            <div>
                                <label className='text-white m-2'>Descripción:</label>
                                <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                                    required className="form-control" placeholder="Ingresar descripción"></input>
                            </div>
                            <div>
                                <label className='text-white m-2'>Vendido:</label>
                                <input type="number" value={ventas_por_dia} onChange={(e) => setVenta(e.target.value)}
                                    required className="form-control" placeholder="Ingresar Cantidad de productos vendidos"></input>
                            </div>
                            <div>
                                <label className='text-white m-2'>Stock disponible:</label>
                                <input type="number" value={stock_total} onChange={(e) => setStock(e.target.value)}
                                    required className="form-control" placeholder="Ingresar Stock disponible"></input>
                            </div>

                            <div className="form-group m-2">
                                <input type="submit" name="btn" value="Login"
                                    className="btn btn-outline-danger float-center login_btn"></input>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <TablaComp2 updateTabla={updateTabla} />
        </div>
    );
}

export default App;