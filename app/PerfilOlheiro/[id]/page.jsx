"use client";
import { useState, useEffect } from "react";
import { FaSearch, FaInstagram, FaFacebook } from "react-icons/fa";
import BackHomeButton from "../../components/VoltarHome";

export default function OlheiroProfile() {
  const [filter, setFilter] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]); // jogadores do banco

  // =========================
  // Buscar todas as jogadoras do backend
  // =========================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/users") // rota GET /users que você vai criar no Flask
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Filtra apenas os usuários que possuem "cpf" (jogadoras)
          const jogadoras = data.filter((u) => u.cpf);
          setPlayers(
            jogadoras.map((u) => ({
              id: u._id,
              name: u.nome || "Sem nome",
              position: u.position || "",
              photo: u.photoUrl || "/default-player.jpg",
              socials: u.socials || { instagram: "", facebook: "" },
              achievements: u.achievements || [],
              matches: u.matches || [],
              cpf: u.cpf, // garante que é jogadora
            }))
          );
        } else {
          console.error("Dados inválidos recebidos do backend:", data);
        }
      })
      .catch((err) => console.error("Erro ao buscar jogadoras:", err));
  }, []);

  const filteredPlayers = players.filter((p) =>
    p.position.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Info do olheiro */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="/olheiro.jpg"
            alt="Foto do olheiro"
            className="w-44 h-32 rounded-full object-cover border-4 border-purple-500"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">João Pereira</h1>
            <p className="text-gray-600">Time: Corinthians</p>
            <p className="text-gray-600">Cargo: Olheiro</p>
            <p className="text-gray-500 text-sm mt-2">Documento verificado: RG enviado</p>
          </div>
          <div className="flex justify-end w-full">
            <BackHomeButton />
          </div>
        </div>

        {/* Seção de busca */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FaSearch /> Buscar Jogadoras
          </h2>
          <input
            type="text"
            placeholder="Filtrar por posição (ex: atacante, goleira...)"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/2 border rounded-lg px-4 py-2 mb-6"
          />

          {/* Lista de jogadoras */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPlayers.map((player) => (
              <div
                key={player.id}
                onClick={() => setSelectedPlayer(player)}
                className="cursor-pointer border rounded-xl p-4 shadow hover:shadow-lg transition bg-gray-50"
              >
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-purple-500"
                />
                <h3 className="text-center font-bold mt-3">{player.name}</h3>
                <p className="text-center text-gray-500">{player.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Detalhes da jogadora */}
        {selectedPlayer && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes da Jogadora</h2>
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img
                src={selectedPlayer.photo}
                alt={selectedPlayer.name}
                className="w-28 h-28 rounded-full border-2 border-purple-500 object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold">{selectedPlayer.name}</h3>
                <p className="text-gray-600">{selectedPlayer.position}</p>
                <div className="flex gap-4 mt-3 text-xl text-purple-600">
                  {selectedPlayer.socials?.instagram && (
                    <a
                      href={selectedPlayer.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {selectedPlayer.socials?.facebook && (
                    <a
                      href={selectedPlayer.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Conquistas */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Conquistas:</h4>
              <div className="flex gap-3 flex-wrap">
                {selectedPlayer.achievements.map((ach, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {ach}
                  </span>
                ))}
              </div>
            </div>

            {/* Histórico de partidas */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Histórico de Partidas:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {selectedPlayer.matches.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
