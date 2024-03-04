from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000",
     "methods": ["GET", "POST", "PUT", "DELETE"], "headers": "Content-Type"}})


# Configuración de la base de datos
app.config['MYSQL_HOST'] = ''
app.config['MYSQL_USER'] = ''
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = ''

# Inicializar la extensión MySQL
mysql = MySQL(app)


@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM asusdb")
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/data', methods=['POST'])
def agregar_usuario():
    try:
        data = request.get_json()
        sku = data['sku']
        descripcion = data['descripcion']
        ventas_por_dia = data['ventas_por_dia']
        stock_total = data['stock_total']

        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO asusdb (sku, descripcion, ventas_diarias, stock_total) VALUES (%s, %s, %s, %s)",
                    (sku, descripcion, ventas_por_dia, stock_total))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Usuario agregado correctamente"})

    except Exception as e:
        return jsonify({"error": str(e)})

# Manejador para solicitudes OPTIONS


@app.route('/api/data/<int:id>', methods=['OPTIONS'])
def options_handler(id):
    response = jsonify({"mensaje": "Preflight request accepted"})
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


@app.route('/api/data/<id>', methods=['DELETE'])
def eliminar_usuario(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM asusdb WHERE sku = %s", (id,))
        mysql.connection.commit()
        cur.close()

        return jsonify({"mensaje": "Usuario eliminado correctamente"})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
