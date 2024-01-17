from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Configura la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="wilimato0908",
    database="asusdb"
)
cursor = db.cursor()

# Ruta para el endpoint POST


@app.route('/api/data', methods=['POST'])
def agregar_usuario():
    try:
        # Obtiene los datos del cuerpo de la solicitud
        data = request.get_json()

        # Extrae los datos del JSON
        sku = data['sku']
        descripcion = data['descripcion']
        ventas_por_dia = data['ventas_por_dia']
        stock_total = data['stock_total']

        # Inserta los datos en la base de datos
        cursor.execute("INSERT INTO historial_producto (sku, descripcion, ventas_por_dia, stock_total) VALUES (%s, %s, %s, %s)",
                       (sku, descripcion, ventas_por_dia, stock_total))
        db.commit()

        return jsonify({"mensaje": "Usuario agregado correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
