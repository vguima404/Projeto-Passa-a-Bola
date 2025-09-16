"use client";

import HeaderComunidade from "../../../components/HeaderComunidade";
import Footer from "../../../components/Footer";

const proximosJogos = [
  { rodada: "Rodada 15", timeA: "Corinthians", timeB: "Palmeiras", data: "20/09/2025", horario: "19:00" },
  { rodada: "Rodada 15", timeA: "Santos", timeB: "Internacional", data: "21/09/2025", horario: "17:00" },
  { rodada: "Rodada 15", timeA: "Flamengo", timeB: "Grêmio", data: "22/09/2025", horario: "20:00" },
  { rodada: "Rodada 15", timeA: "São Paulo", timeB: "Cruzeiro", data: "23/09/2025", horario: "18:00" },
];

export default function BrasileiraoFeminino() {
  return (
    <>
    <HeaderComunidade />
    <div className="p-8 py-40 min-h-screen bg-gradient-to-br from-purple-100 via-white to-yellow-100 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-700 drop-shadow-lg tracking-wide animate-fade-in">
        Próximos Jogos - Brasileirão Feminino
      </h1>
      {/* Imagem do Brasileirão */}
      <div className="mb-10">
        <img
          src="/TabelaBrasileirao.png"
          alt="Brasileirão Feminino"
          className="w-100 rounded-xl shadow-lg border-4 border-yellow-300"
        />
      </div>
      {/* Lista de jogos */}
      <div className="flex flex-col gap-6 w-full max-w-xl">
        {proximosJogos.map((jogo, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-purple-200 via-white to-yellow-100 shadow-xl rounded-xl px-6 py-4 transition-transform hover:scale-105 animate-fade-in"
          >
            <div className="flex flex-col md:flex-row items-center gap-4">
              <span className="font-bold text-purple-700 text-lg">{jogo.timeA}</span>
              <span className="text-purple-500 font-semibold">vs</span>
              <span className="font-bold text-purple-700 text-lg">{jogo.timeB}</span>
            </div>
            <div className="flex flex-col text-center mt-2 md:mt-0">
              <span className="text-sm text-gray-600 font-semibold">{jogo.rodada}</span>
              <span className="text-sm text-gray-600">{jogo.data} - {jogo.horario}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
} 