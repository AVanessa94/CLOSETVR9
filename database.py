from conexion import crear_conexion

def obtener_productos():
    conn = crear_conexion()
    if not conn:
        return []

    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, nombre, precio, descripcion, categoria FROM productos;")
        rows = cursor.fetchall()
        productos = []
        for row in rows:
            productos.append({
                "id": row[0],
                "nombre": row[1],
                "precio": row[2],
                "descripcion": row[3],
                "categoria": row[4]
            })
        return productos
    except Exception as e:
        print("❌ Error consultando:", e)
        return []
    finally:
        cursor.close()
        conn.close()

def crear_usuario(nombre, email, password):
    conn = crear_conexion()
    if not conn:
        return False

    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO usuarios (nombre, email, password) VALUES (%s, %s, %s);",
                       (nombre, email, password))
        conn.commit()
        return True
    except Exception as e:
        print("❌ Error creando usuario:", e)
        return False
    finally:
        cursor.close()
        conn.close()
