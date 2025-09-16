"use client";

import { useEffect, useState } from "react";

export default function AdminPosLogin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [gols, setGols] = useState(0);
  const [defesas, setDefesas] = useState(0);

  // Busca todos os usuários
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  }, []);

  // Iniciar edição
  const handleEdit = (user) => {
    setEditId(user._id);
    setGols(user.gols || 0);
    setDefesas(user.defesas || 0);
  };

  // Salvar alterações
  const handleSave = async (userId) => {
    try {
      await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gols, defesas }),
      });
      setEditId(null);

      // Atualiza lista
      const res = await fetch("http://localhost:5000/users");
      setUsuarios(await res.json());
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
    }
  };

  // Função para remover usuário
  const handleDelete = async (userId) => {
    if (!window.confirm("Tem certeza que deseja remover este usuário?")) return;
    try {
      await fetch(`http://localhost:5000/user/${userId}`, {
        method: "DELETE",
      });
      // Atualiza lista
      const res = await fetch("http://localhost:5000/users");
      setUsuarios(await res.json());
    } catch (err) {
      console.error("Erro ao remover usuário:", err);
    }
  };

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Administração de Usuários</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300 text-left">Nome</th>
            <th className="p-2 border border-gray-300 text-left">Tipo</th>
            <th className="p-2 border border-gray-300 text-center">Gols</th>
            <th className="p-2 border border-gray-300 text-center">Defesas</th>
            <th className="p-2 border border-gray-300 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user._id} className="border-t border-gray-300">
              <td className="p-2 border border-gray-300">{user.nome}</td>
              <td className="p-2 border border-gray-300">
                {user.tipo || (user.jogadora ? "Jogadora" : user.olheiro ? "Olheiro" : "")}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {editId === user._id ? (
                  <input
                    type="number"
                    value={gols}
                    onChange={e => setGols(Number(e.target.value))}
                    className="border rounded px-2 w-20 text-center"
                  />
                ) : (
                  user.gols || 0
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center">
                {editId === user._id ? (
                  <input
                    type="number"
                    value={defesas}
                    onChange={e => setDefesas(Number(e.target.value))}
                    className="border rounded px-2 w-20 text-center"
                  />
                ) : (
                  user.defesas || 0
                )}
              </td>
              <td className="p-2 border border-gray-300 text-center flex gap-2 justify-center">
                {editId !== user._id ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </button>
                    <button
                      className={`px-2 py-1 rounded ${user.admin ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 text-white"}`}
                      onClick={() => !user.admin && handleDelete(user._id)}
                      disabled={user.admin}
                    >
                      Remover
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() => handleSave(user._id)}
                  >
                    Salvar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
