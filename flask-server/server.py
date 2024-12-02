from flask import Flask, request, jsonify
import pyodbc

app = Flask(__name__)

conn_parametros = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=localhost\SQLEXPRESS;"  # Altere para o endereço do servidor
    "DATABASE=aluguel_equipamentos;"  # Altere para o nome do seu banco
    "Trusted_Connection=yes;"
)
conn = pyodbc.connect(conn_parametros)
cursor = conn.cursor()

@app.route('/')
def main():
    select = cursor.execute("""SELECT * from Equipamentos""")
    print(select)


cursor.close()
conn.close()

if __name__ == "__main__":
    app.run(debug=True)