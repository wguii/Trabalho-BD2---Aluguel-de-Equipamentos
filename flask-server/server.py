from flask import Flask, request, jsonify
import pyodbc
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


conn_configurar = (
    "DRIVER={ODBC Driver 17 for SQL Server};"
    "SERVER=localhost\SQLEXPRESS;"  
    "DATABASE=aluguel_equipamentos;"  
    "Trusted_Connection=yes;"
)
conn = pyodbc.connect(conn_configurar)
cursor = conn.cursor()

@app.route('/equipamentos', methods=['GET'])
def get_equipamentos():
    cursor.execute("SELECT * FROM Equipamentos")
    rows = cursor.fetchall()
    result = [
        {
            "EquipamentoID": row[0],
            "Nome": row[1],
            "CategoriaID": row[2],
            "Status": row[3],
            "ValorDiaria": row[4],
            "Descricao": row[5],
        }
        for row in rows
    ]
    return jsonify(result)


@app.route('/equipamentos', methods=['POST'])
def add_equipamento():
    data = request.json
    cursor.execute(
        "INSERT INTO Equipamentos (Nome, CategoriaID, Status, ValorDiaria, Descricao) VALUES (?, ?, ?, ?, ?)",
        data['Nome'], data['CategoriaID'], data['Status'], data['ValorDiaria'], data['Descricao']
    )
    conn.commit()
    return jsonify({"message": "Equipamento adicionado com sucesso!"}), 201


@app.route('/equipamentos/<int:id>', methods=['PUT'])
def update_equipamento(id):
    data = request.json
    cursor.execute(
        "UPDATE Equipamentos SET Nome = ?, CategoriaID = ?, Status = ?, ValorDiaria = ?, Descricao = ? WHERE EquipamentoID = ?",
        data['Nome'], data['CategoriaID'], data['Status'], data['ValorDiaria'], data['Descricao'], id
    )
    conn.commit()
    return jsonify({"message": "Equipamento atualizado com sucesso!"})


@app.route('/equipamentos/<int:id>', methods=['DELETE'])
def delete_equipamento(id):
    cursor.execute("DELETE FROM Equipamentos WHERE EquipamentoID = ?", id)
    conn.commit()
    return jsonify({"message": "Equipamento deletado com sucesso!"})

if __name__ == '__main__':
    app.run(debug=True)
