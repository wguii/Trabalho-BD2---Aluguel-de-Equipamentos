import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [formData, setFormData] = useState({
    Nome: "",
    CategoriaID: "",
    Status: "Disponível",
    ValorDiaria: "",
    Descricao: "",
  });

  // Fetch de equipamentos
  useEffect(() => {
    fetchEquipamentos();
  }, []);

  const fetchEquipamentos = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/equipamentos");
      setEquipamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/equipamentos", formData);
      fetchEquipamentos();
      setFormData({
        Nome: "",
        CategoriaID: "",
        Status: "Disponível",
        ValorDiaria: "",
        Descricao: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/equipamentos/${id}`);
      fetchEquipamentos();
    } catch (error) {
      console.error("Erro ao deletar equipamento:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gerenciamento de Equipamentos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="Nome"
            value={formData.Nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoria ID</label>
          <input
            type="number"
            className="form-control"
            name="CategoriaID"
            value={formData.CategoriaID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
          >
            <option>Disponível</option>
            <option>Indisponível</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Valor Diária</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            name="ValorDiaria"
            value={formData.ValorDiaria}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            name="Descricao"
            value={formData.Descricao}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Equipamento
        </button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equip) => (
            <tr key={equip.EquipamentoID}>
              <td>{equip.EquipamentoID}</td>
              <td>{equip.Nome}</td>
              <td>{equip.CategoriaID}</td>
              <td>{equip.Status}</td>
              <td>R$ {equip.ValorDiaria.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(equip.EquipamentoID)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
