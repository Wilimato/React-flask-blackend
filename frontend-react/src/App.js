import React, { useState, useEffect } from 'react';

function App() {
  // Estado para almacenar los datos recuperados del servidor
  const [data, setData] = useState([]);

  // Función para obtener datos del servidor
  const fetchData = async () => {
    await fetch('http://127.0.0.1:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  console.log(data)

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* Verificar que data no sea null o undefined antes de mapear */}
      {data && data.length > 0 ? (
        // Mapear datos recuperados y mostrarlos en una lista
        data.map((item, index) => (
          <div key={index}>
            <ul>
              {/* Mapear elementos de cada conjunto de datos */}
              {item.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </div>

        ))
      ) : (
        // Mostrar mensaje si no hay datos disponibles
        <p>No hay datos disponibles</p>
      )}
    </div>
  );
}

export default App;
