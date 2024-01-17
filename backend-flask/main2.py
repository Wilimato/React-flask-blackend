from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL
import mysql.connector


app = Flask(__name__)

# Permite CORS para todos los recursos en la aplicación
CORS(app)


# Configuración de la base de datos
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'wilimato0908'
app.config['MYSQL_DB'] = 'asusdb'

# Configura la conexión a la base de datos
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="wilimato0908",
    database="asusdb"
)
cursor = db.cursor()

# Inicializar la extensión MySQL
mysql = MySQL(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM historial_producto")
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})


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
