"use client";
import HeaderComunidade from "../../../components/HeaderComunidade";
import Footer from "../../../components/Footer";

const jogos = [
  // Quartas de final
  { fase: "Quartas", timeA: "Time Alpha", timeB: "Time Beta", horario: "20/09 - 18:00" },
  { fase: "Quartas", timeA: "Time Delta", timeB: "Time Sigma", horario: "20/09 - 19:00" },
  { fase: "Quartas", timeA: "Time Omega", timeB: "Time Zeta", horario: "21/09 - 18:00" },
  { fase: "Quartas", timeA: "Time Gamma", timeB: "Time Theta", horario: "21/09 - 19:00" },
  // Semifinais
  { fase: "Semifinal", timeA: "Vencedor Jogo 1", timeB: "Vencedor Jogo 2", horario: "22/09 - 18:00" },
  { fase: "Semifinal", timeA: "Vencedor Jogo 3", timeB: "Vencedor Jogo 4", horario: "22/09 - 19:00" },
  // Final
  { fase: "Final", timeA: "A definir", timeB: "A definir", horario: "23/09 - 20:00" },
];

export default function ProximosJogos() {
  return (
    <>
    <HeaderComunidade/>
    <div className="p-8 min-h-screen bg-gradient-to-br from-purple-100 via-
    white to-yellow-100">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-purple-700 drop-shadow-lg tracking-wide animate-fade-in">
        Chaveamento dos Jogos
      </h1>
      <div className="flex flex-col items-center gap-10">
        {/* Quartas de final */}
        <div className="flex flex-col gap-4 w-full max-w-xl">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Quartas de Final</h2>
          {jogos.filter(j => j.fase === "Quartas").map((jogo, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gradient-to-r from-purple-200 via-white to-purple-100 shadow-xl rounded-xl px-6 py-4 transition-transform hover:scale-105 animate-fade-in"
            >
              <span className="font-bold text-purple-700 text-lg">{jogo.timeA}</span>
              <span className="text-purple-500 font-semibold">vs</span>
              <span className="font-bold text-purple-700 text-lg">{jogo.timeB}</span>
              <span className="ml-4 text-sm text-gray-600">{jogo.horario}</span>
            </div>
          ))}
        </div>
        {/* Semifinais */}
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Semifinais</h2>
          {jogos.filter(j => j.fase === "Semifinal").map((jogo, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gradient-to-r from-yellow-100 via-white to-purple-100 shadow-xl rounded-xl px-6 py-4 transition-transform hover:scale-105 animate-fade-in"
            >
              <span className="font-bold text-purple-800 text-lg">{jogo.timeA}</span>
              <span className="text-purple-500 font-semibold">vs</span>
              <span className="font-bold text-purple-800 text-lg">{jogo.timeB}</span>
              <span className="ml-4 text-sm text-gray-600">{jogo.horario}</span>
            </div>
          ))}
        </div>
        {/* Final */}
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Final</h2>
          <div
            className="flex justify-between items-center bg-gradient-to-r from-yellow-300 via-white to-yellow-100 shadow-2xl rounded-2xl px-8 py-6 transition-transform hover:scale-105 animate-fade-in"
          >
            <span className="font-extrabold text-yellow-700 text-xl tracking-wide drop-shadow-lg">{jogos[6].timeA}</span>
            <span className="text-yellow-600 text-lg font-bold">vs</span>
            <span className="font-extrabold text-yellow-700 text-xl tracking-wide drop-shadow-lg">{jogos[6].timeB}</span>
            <span className="ml-4 text-sm text-gray-600 font-semibold">{jogos[6].horario}</span>
          </div>
        </div>
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
    <Footer/>
    </>
  );
}