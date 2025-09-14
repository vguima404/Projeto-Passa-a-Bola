"use client";
import React, { useState, useEffect } from "react";
import HeaderComunidade from "../../../components/HeaderComunidade";
import Footer from "../../../components/Footer";

// Componente estilo card FIFA
function PlayerCard({ player, pos }) {
  return (
    <div className="relative bg-gradient-to-br from-yellow-200 via-white to-purple-100 rounded-[2.5rem] shadow-2xl p-0 w-56 h-88 flex flex-col items-center justify-between border-4 border-yellow-400 group transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_8px_rgba(168,85,247,0.25)] hover:border-purple-400">
      {/* Moldura FIFA + brilho animado */}
      <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] border-4 border-yellow-500 shadow-[0_0_32px_8px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_48px_12px_rgba(168,85,247,0.25)] animate-pulse"></div>

      {/* Topo: posição e medalha */}
      <div className="flex items-center justify-between w-full px-4 pt-3">
        <span className="bg-gradient-to-r from-yellow-400 to-purple-400 text-white font-extrabold text-lg rounded-full px-3 py-1 shadow-lg border-2 border-white/60">{pos + 1}</span>
        <span className="text-yellow-700 text-2xl font-black drop-shadow animate-bounce">★</span>
      </div>

      {/* Foto da jogadora */}
      <img
        src={player.image || "/placeholder-player.png"}
        alt={player.name}
        className="w-32 h-32 rounded-full border-4 border-yellow-300 shadow-xl mt-2 object-cover bg-white group-hover:border-purple-400 group-hover:shadow-purple-200 transition-all duration-300"
        style={{ zIndex: 1 }}
      />

      {/* Estatística principal: número grande */}
      <div className="flex flex-col items-center mt-2">
        <span className="text-6xl font-extrabold text-yellow-600 drop-shadow-lg leading-none group-hover:text-purple-600 transition-colors duration-300">{player.stat}</span>
        <span className="uppercase text-xs font-bold text-yellow-800 tracking-widest group-hover:text-purple-800 transition-colors duration-300">{player.type}</span>
      </div>

      {/* Nome */}
      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3 text-center w-full truncate px-2 group-hover:text-purple-700 transition-colors duration-300">{player.name}</h3>

      {/* Efeito de brilho esportivo */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-24 h-2 bg-gradient-to-r from-yellow-300 via-white to-purple-300 rounded-full blur-sm opacity-70"></div>
    </div>
  );
}

export default function EstatisticasPage() {
  const [topGoleadoras, setTopGoleadoras] = useState([]);
  const [topDefesas, setTopDefesas] = useState([]);

  // ⚠️ Aqui futuramente você vai trocar pelo fetch do MongoDB
  useEffect(() => {
    // Simulando dados vindos do banco
    const mockGols = [
      { name: "Marta", image: "/IA1.jpg", stat: 15, type: "Gols" },
      { name: "Bia Zaneratto", image: "/IA2.jpg", stat: 12, type: "Gols" },
      { name: "Kerolin", image: "/IA3.jpg", stat: 9, type: "Gols" },
    ];

    const mockDefesas = [
      { name: "Letícia", image: "/IA4.jpg", stat: 45, type: "Defesas" },
      { name: "Bárbara", image: "/IA5.jpg", stat: 40, type: "Defesas" },
      { name: "Karine", image: "/IA6.jpg ", stat: 37, type: "Defesas" },
    ];

    setTopGoleadoras(mockGols);
    setTopDefesas(mockDefesas);
  }, []);

  return (
    <>
    <HeaderComunidade />
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-purple-900 via-purple-400 to-yellow-200 relative overflow-x-hidden animate-gradient-move">
      {/* Shapes esportivos e gradiente animado */}
      <div className="absolute inset-0 z-0 bg-[url('/estadio.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-purple-900/80 via-transparent to-yellow-100/60"></div>
      <div className="absolute top-0 left-0 w-1/2 h-40 bg-gradient-to-r from-purple-400/60 to-transparent rounded-br-full blur-2xl opacity-60 z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-40 bg-gradient-to-l from-yellow-200/60 to-transparent rounded-tl-full blur-2xl opacity-60 z-10"></div>

      <main className="relative z-20 w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center pt-32 md:pt-28">

        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-purple-400 drop-shadow-[0_0_32px_rgba(168,85,247,0.5)] mb-4 text-center tracking-tight animate-pulse">
          Estatísticas do Campeonato
        </h1>
        <p className="text-lg text-gray-100 mb-10 text-center max-w-2xl mx-auto">
          Acompanhe o desempenho das principais jogadoras do campeonato, veja quem são as artilheiras e as goleiras com mais defesas. Dados atualizados e visual moderno para você ficar por dentro dos destaques da competição!
        </p>

        {/* Ranking de Gols */}
        <section className="mb-20 w-full">
          <h2 className="text-3xl font-bold text-yellow-100 drop-shadow mb-8 text-center uppercase tracking-widest">
            🥇 Artilheiras
          </h2>
          <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
            {topGoleadoras.map((player, idx) => (
              <PlayerCard key={idx} player={player} pos={idx} />
            ))}
          </div>
        </section>

        {/* Ranking de Defesas */}
        <section className="w-full">
          <h2 className="text-3xl font-bold text-yellow-100 drop-shadow mb-8 text-center uppercase tracking-widest">
            🧤 Maiores Defesas
          </h2>
          <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-2xl p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
            {topDefesas.map((player, idx) => (
              <PlayerCard key={idx} player={player} pos={idx} />
            ))}
          </div>
        </section>
      </main>
    </div>
    <Footer />
    </>
  );
}
