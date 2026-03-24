import os
from flask import Flask, request, redirect, jsonify, send_file

app = Flask(__name__)

# Carpeta donde están tus HTML
BASE_DIR = r"C:\Users\angie\OneDrive\Escritorio\CLOSETVR--main"

# Productos simulados en memoria
productos = [
    {"id": 1, "nombre": "Pantalones Vaqueros Acampanados", "descripcion": "Jeans Y2K con parches y flecos.", "precio": 89990, "categoria": "pantalones"},
    {"id": 2, "nombre": "Blazer Elegante Negro", "descripcion": "Blazer oficina estilo moderno.", "precio": 150990, "categoria": "abrigos"},
    {"id": 3, "nombre": "Camiseta Oversize Blanco", "descripcion": "Algodón premium corte oversize.", "precio": 45990, "categoria": "camisetas"},
    {"id": 4, "nombre": "Zapatos Deportivos Urbanos", "descripcion": "Zapatillas streetwear.", "precio": 129990, "categoria": "zapatos"},
    {"id": 5, "nombre": "Vestido Verano Floral", "descripcion": "Vestido ligero estampado floral.", "precio": 75990, "categoria": "vestidos"},
    {"id": 6, "nombre": "Chaqueta Denim Clásica", "descripcion": "Jean jacket vintage.", "precio": 110990, "categoria": "abrigos"},
]

# Rutas para servir tus HTML directamente desde CLOSETVR--main
@app.route('/login', methods=['GET'])
def login_page():
    return send_file(os.path.join(BASE_DIR, 'loginsignup.html'))

@app.route('/catalogo', methods=['GET'])
def catalogo_page():
    return send_file(os.path.join(BASE_DIR, 'catalogo.html'))

# API para obtener productos
@app.route('/api/productos', methods=['GET'])
def api_productos():
    return jsonify({"productos": productos})

# Login simulado
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('loginEmail')
    password = request.form.get('loginPassword')
    # Simula que cualquier login es válido
    return redirect('/catalogo')

# Signup simulado
@app.route('/signup', methods=['POST'])
def signup():
    nombre = request.form.get('signupName')
    email = request.form.get('signupEmail')
    password = request.form.get('signupPassword')
    # Simula registro exitoso
    return redirect('/catalogo')

if __name__ == '__main__':
    # Ejecuta el servidor en el puerto 5000
    app.run(debug=True)
