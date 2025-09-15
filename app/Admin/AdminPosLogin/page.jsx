"use client";

import { useEffect, useState } from "react";

export default function AdminPosLogin() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [gols, setGols] = useState(0);
  const [defesas, setDefesas] = useState(0);

  useEffect(() => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      });
  }, []);

  const handleEdit = (user) => {
    setEditId(user._id);
    setGols(user.gols || 0);
    setDefesas(user.defesas || 0);
  };

  const handleSave = async (userId) => {
    await fetch(`/api/usuarios/${userId}/estatisticas`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gols, defesas }),
    });
    setEditId(null);
    // Atualiza lista
    const res = await fetch("/api/usuarios");
    setUsuarios(await res.json());
  };

  const handleRG = async (userId, status) => {
    await fetch(`/api/usuarios/${userId}/rg`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const res = await fetch("/api/usuarios");
    setUsuarios(await res.json());
  };

  const handleDeleteHighlight = async (highlightId) => {
    await fetch(`/api/highlights/${highlightId}`, { method: "DELETE" });
    const res = await fetch("/api/usuarios");
    setUsuarios(await res.json());
  };

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Administração de Usuários</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nome</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Gols</th>
            <th className="p-2">Defesas</th>
            <th className="p-2">RG</th>
            <th className="p-2">Highlights</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.nome}</td>
              <td className="p-2">{user.tipo}</td>
              <td className="p-2">
                {user.tipo === "jogadora" && editId === user._id ? (
                  <input
                    type="number"
                    value={gols}
                    onChange={e => setGols(Number(e.target.value))}
                    className="border rounded px-2 w-16"
                  />
                ) : user.gols}
              </td>
              <td className="p-2">
                {user.tipo === "jogadora" && editId === user._id ? (
                  <input
                    type="number"
                    value={defesas}
                    onChange={e => setDefesas(Number(e.target.value))}
                    className="border rounded px-2 w-16"
                  />
                ) : user.defesas}
              </td>
              <td className="p-2">
                {user.rgStatus === "pendente" ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleRG(user._id, "aceito")}
                    >
                      Aceitar
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRG(user._id, "rejeitado")}
                    >
                      Rejeitar
                    </button>
                  </>
                ) : (
                  <span>{user.rgStatus}</span>
                )}
              </td>
              <td className="p-2">
                {user.highlights?.map(h => (
                  <div key={h._id} className="flex items-center gap-2">
                    <span>{h.titulo}</span>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      onClick={() => handleDeleteHighlight(h._id)}
                    >
                      Apagar
                    </button>
                  </div>
                ))}
              </td>
              <td className="p-2">
                {user.tipo === "jogadora" && editId !== user._id && (
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                )}
                {user.tipo === "jogadora" && editId === user._id && (
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