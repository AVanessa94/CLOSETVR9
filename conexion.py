import os
from dotenv import load_dotenv
import psycopg2

# Cargar variables del archivo .env
load_dotenv()

HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
DBNAME = os.getenv("DB_NAME")
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASS")
CA_PATH = os.getenv("DB_CA_PATH")

def crear_conexion():
    try:
        conexion = psycopg2.connect(
            host=HOST,
            port=PORT,
            dbname=DBNAME,
            user=USER,
            password=PASSWORD,
            sslmode="verify-full",
            sslrootcert=CA_PATH
        )
        return conexion
    except Exception as e:
        print("❌ Error al conectar:", e)
        return None