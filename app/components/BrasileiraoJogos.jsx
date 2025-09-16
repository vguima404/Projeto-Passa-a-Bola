"use client";

import { useEffect, useState } from "react";


function extractGames(data) {
  let games = [];
  function findGames(obj) {
    if (!obj || typeof obj !== 'object') return;
    if (obj.hasOwnProperty('partida_id')) { games.push(obj); return; }
    for (const key in obj) findGames(obj[key]);
  }
  findGames(data);
  return games;
}

function extractTable(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object' || Object.keys(data).length === 0) return [];
  const firstPhaseKey = Object.keys(data)[0];
  const phaseData = data[firstPhaseKey];
  if (!phaseData || typeof phaseData !== 'object' || Object.keys(phaseData).length === 0) return [];
  const firstGroupKey = Object.keys(phaseData)[0];
  const tableData = phaseData[firstGroupKey];
  return Array.isArray(tableData) ? tableData : [];
}

function extractLiveGames(data) {
  if (!data || typeof data !== 'object') return [];
  return Object.values(data).flat();
}



function JogoAoVivo({ jogo }) {
  return (
    <div className="flex flex-col gap-2 bg-red-50 shadow-lg rounded-lg p-4 transition-transform hover:scale-105 animate-fade-in border-2 border-red-500">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-red-700">{jogo.campeonato.nome}</span>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm font-bold text-red-600 uppercase">AO VIVO</span>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center gap-1 w-2/5">
          <img src={jogo.time_mandante.escudo} alt={jogo.time_mandante.nome_popular} className="w-8 h-8"/>
          <span className="font-semibold text-gray-800 text-center text-sm">{jogo.time_mandante.nome_popular}</span>
        </div>
        <div className="text-2xl font-black text-gray-900">
          {jogo.placar_mandante} x {jogo.placar_visitante}
        </div>
        <div className="flex flex-col items-center gap-1 w-2/5">
          <img src={jogo.time_visitante.escudo} alt={jogo.time_visitante.nome_popular} className="w-8 h-8"/>
          <span className="font-semibold text-gray-800 text-center text-sm">{jogo.time_visitante.nome_popular}</span>
        </div>
      </div>
    </div>
  );
}

function JogoFinalizado({ jogo }) {
  return (
    <div className="flex items-center justify-between bg-white/60 shadow-md rounded-lg px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-2 flex-1 truncate">
        <span className="font-semibold text-gray-700 text-sm text-right w-20 truncate">{jogo.time_mandante.nome_popular}</span>
        <img src={jogo.time_mandante.escudo} alt={jogo.time_mandante.nome_popular} className="w-6 h-6" />
        <span className="text-gray-800 font-bold text-sm mx-1">{jogo.placar}</span>
        <img src={jogo.time_visitante.escudo} alt={jogo.time_visitante.nome_popular} className="w-6 h-6" />
        <span className="font-semibold text-gray-700 text-sm text-left w-20 truncate">{jogo.time_visitante.nome_popular}</span>
      </div>
      <div className="text-right ml-2">
        <div className="text-xs text-gray-500">{new Date(jogo.data_realizacao_iso).toLocaleDateString("pt-BR")}</div>
        <div className="text-xs font-bold text-red-500 uppercase">{jogo.status}</div>
      </div>
    </div>
  );
}

function JogoAgendado({ jogo }) {
  return (
    <div className="flex items-center justify-between bg-white/60 shadow-md rounded-lg px-4 py-3 animate-fade-in border-l-4 border-green-500">
      <div className="flex items-center gap-2 flex-1 truncate">
        <span className="font-semibold text-gray-700 text-sm text-right w-20 truncate">{jogo.time_mandante.nome_popular}</span>
        <img src={jogo.time_mandante.escudo} alt={jogo.time_mandante.nome_popular} className="w-6 h-6" />
        <span className="text-green-800 bg-green-100 rounded-md px-2 py-1 font-bold text-sm mx-1">{jogo.hora_realizacao}</span>
        <img src={jogo.time_visitante.escudo} alt={jogo.time_visitante.nome_popular} className="w-6 h-6" />
        <span className="font-semibold text-gray-700 text-sm text-left w-20 truncate">{jogo.time_visitante.nome_popular}</span>
      </div>
      <div className="text-right ml-2">
        <div className="text-xs text-gray-500 font-semibold">{new Date(jogo.data_realizacao_iso).toLocaleDateString("pt-BR", { weekday: 'short', day: 'numeric', month: 'short' })}</div>
        <div className="text-xs font-bold text-green-600 uppercase">{jogo.status}</div>
      </div>
    </div>
  );
}

function Tabela({ tabelaData }) {
  return (
    <div className="bg-white/60 shadow-md rounded-lg p-4 animate-fade-in h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Classificação</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50/50">
            <tr>
              <th scope="col" className="px-2 py-2">P</th>
              <th scope="col" className="px-4 py-2">Time</th>
              <th scope="col" className="px-2 py-2 text-center">Pts</th>
              <th scope="col" className="px-2 py-2 text-center">J</th>
              <th scope="col" className="px-2 py-2 text-center">V</th>
              <th scope="col" className="px-2 py-2 text-center">SG</th>
            </tr>
          </thead>
          <tbody>
            {tabelaData.map((time) => (
              <tr key={time.time.time_id} className="border-b border-gray-200 hover:bg-gray-50/50">
                <td className="px-2 py-2 font-medium">{time.posicao}</td>
                <td className="px-4 py-2 font-semibold text-gray-900 flex items-center gap-3">
                  <img src={time.time.escudo} alt={time.time.nome_popular} className="w-5 h-5" />
                  {time.time.nome_popular}
                </td>
                <td className="px-2 py-2 text-center font-bold">{time.pontos}</td>
                <td className="px-2 py-2 text-center">{time.jogos}</td>
                <td className="px-2 py-2 text-center">{time.vitorias}</td>
                <td className="px-2 py-2 text-center">{time.saldo_gols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default function FutebolPage() {
  const [finalizados, setFinalizados] = useState([]);
  const [proximos, setProximos] = useState([]);
  const [aoVivo, setAoVivo] = useState([]);
  const [tabela, setTabela] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const campeonatoId = 30; // Id de campeonato ainda nao está pegando pois a key é de teste
  const timeIdParaAoVivo = 65;  // ID do time também nao está pegando por conta da key de teste

  useEffect(() => {
    const fetchJogos = fetch(`https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/partidas`, {
      cache: "no-store", headers: { Authorization: "Bearer test_698f6775d842f26a03f89bd4ec09f4" },
    });
    const fetchTabela = fetch(`https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/tabela`, {
      cache: "no-store", headers: { Authorization: "Bearer test_698f6775d842f26a03f89bd4ec09f4" },
    });
    const fetchAoVivo = fetch(`https://api.api-futebol.com.br/v1/times/${timeIdParaAoVivo}/partidas/ao-vivo`, {
      cache: "no-store", headers: { Authorization: "Bearer test_698f6775d842f26a03f89bd4ec09f4" },
    });

    Promise.all([fetchJogos, fetchTabela, fetchAoVivo])
      .then(async ([resJogos, resTabela, resAoVivo]) => {
        if (!resJogos.ok || !resTabela.ok || !resAoVivo.ok) throw new Error('Falha em uma das requisições da API');
        const dataJogos = await resJogos.json();
        const dataTabela = await resTabela.json();
        const dataAoVivo = await resAoVivo.json();
        return [dataJogos, dataTabela, dataAoVivo];
      })
      .then(([dataJogos, dataTabela, dataAoVivo]) => {
        const allGames = extractGames(dataJogos);
        const jogosFinalizados = allGames.filter(j => j.status === 'finalizado');
        
        // Lógica de simulação para a API de teste
        setFinalizados(jogosFinalizados.slice(0, 5)); 
        setProximos(jogosFinalizados.slice(5, 10));

        setTabela(extractTable(dataTabela));
        setAoVivo(extractLiveGames(dataAoVivo));
        
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados.");
        setLoading(false);
      });
  }, [campeonatoId, timeIdParaAoVivo]);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Painel de Jogos</h1>

      {loading && <div className="text-gray-800 font-bold text-lg animate-pulse">Carregando...</div>}
      {error && <div className="text-red-500 italic text-center">{error}</div>}

      {!loading && !error && (
        <div className="w-full max-w-7xl">
          <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">AO VIVO</h2>
          {aoVivo.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {aoVivo.map(jogo => <JogoAoVivo key={jogo.partida_id} jogo={jogo} />)}
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-8">Nenhuma partida ao vivo para este time no momento.</p>
          )}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {tabela.length > 0 ? <Tabela tabelaData={tabela} /> : <p className="text-center text-gray-500 mt-10">Tabela não disponível.</p>}
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Próximas Partidas</h2>
                {proximos.length > 0 ? (
                  <div className="flex flex-col gap-3">{proximos.map(j => <JogoAgendado key={j.partida_id} jogo={j} />)}</div>
                ) : (
                  <p className="text-center text-gray-500">Nenhuma próxima partida encontrada.</p>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Resultados Recentes</h2>
                {finalizados.length > 0 ? (
                  <div className="flex flex-col gap-3">{finalizados.map(j => <JogoFinalizado key={j.partida_id} jogo={j} />)}</div>
                ) : (
                  <p className="text-center text-gray-500">Nenhum resultado recente encontrado.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`.animate-fade-in { animation: fadeIn 0.8s ease; } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}