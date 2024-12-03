import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [form, setForm] = useState({
    Nome: "",
    CategoriaID: "",
    Status: "",
    ValorDiaria: "",
    Descricao: "",
  });

  useEffect(() => {
    fetchEquipamentos();
  }, []);

  
  const fetchEquipamentos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/equipamentos");
      const data = await response.json();
      setEquipamentos(data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    }
  };

  
  const addEquipamento = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:5000/equipamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      fetchEquipamentos();
      setForm({ Nome: "", CategoriaID: "", Status: "", ValorDiaria: "", Descricao: "" });
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
    }
  };

  
  const updateEquipamento = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/equipamentos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      fetchEquipamentos();
      setForm({ Nome: "", CategoriaID: "", Status: "", ValorDiaria: "", Descricao: "" });
    } catch (error) {
      console.error("Erro ao atualizar equipamento:", error);
    }
  };

  
  const deleteEquipamento = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/equipamentos/${id}`, {
        method: "DELETE",
      });
      fetchEquipamentos();
    } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Gerenciamento de Equipamentos</h1>
      <form onSubmit={addEquipamento}>
        <input
          type="text"
          placeholder="Nome"
          value={form.Nome}
          onChange={(e) => setForm({ ...form, Nome: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          placeholder="CategoriaID"
          value={form.CategoriaID}
          onChange={(e) => setForm({ ...form, CategoriaID: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={form.Status}
          onChange={(e) => setForm({ ...form, Status: e.target.value })}
          className="form-control mb-2"
          required
        />
        <input
          type="number"
          placeholder="Valor Diária"
          value={form.ValorDiaria}
          onChange={(e) => setForm({ ...form, ValorDiaria: e.target.value })}
          className="form-control mb-2"
          required
        />
        <textarea
          placeholder="Descrição"
          value={form.Descricao}
          onChange={(e) => setForm({ ...form, Descricao: e.target.value })}
          className="form-control mb-2"
          required
        ></textarea>
        <button className="btn btn-primary">Adicionar Equipamento</button>
      </form>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamento) => (
            <tr key={equipamento.EquipamentoID}>
              <td>{equipamento.EquipamentoID}</td>
              <td>{equipamento.Nome}</td>
              <td>{equipamento.CategoriaID}</td>
              <td>{equipamento.Status}</td>
              <td>{equipamento.ValorDiaria}</td>
              <td>{equipamento.Descricao}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => updateEquipamento(equipamento.EquipamentoID)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEquipamento(equipamento.EquipamentoID)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
