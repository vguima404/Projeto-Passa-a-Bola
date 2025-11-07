"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

// Base do backend (Render em produção; localhost em dev)
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000"
    : "https://projeto-passa-a-bola.onrender.com");

function Section({ title, children, right }) {
  return (
    <section className="bg-white rounded-2xl shadow p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

function StatCard({ label, value, color = "text-purple-600" }) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default function PlayerDashboard({ playerId }) {
  const [stats, setStats] = useState(null);
  const [media, setMedia] = useState({ items: [], totals: { views: 0, likes: 0, comments: 0 } });
  const [competitions, setCompetitions] = useState([]);
  const [recs, setRecs] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);
  const TABS = ["Visão geral", "Mídia", "Competições", "Recomendações", "Feedback"];
  const [tab, setTab] = useState(TABS[0]);
  const [period, setPeriod] = useState("Tudo"); // 7, 30, 90, Tudo

  useEffect(() => {
    if (!playerId) return;
    let isMounted = true;
    async function loadAll() {
      try {
        // Busca os dados REAIS do usuário no backend e mapeia para o dashboard
        const res = await fetch(`${API_BASE}/user/${playerId}`);
        const data = await res.json();
        if (!isMounted) return;
        if (data?.success) {
          const mappedStats = {
            position: data.position || "-",
            matches: Array.isArray(data.matches) ? data.matches.length : (Number(data.matches) || 0),
            goals: Number(data.gols || 0),
            saves: Number(data.defesas || 0),
            assists: 0,
            wins: 0,
            ratingAvg: 0,
          };
          setStats(mappedStats);
        } else {
          console.warn("Falha ao obter usuário para dashboard:", data);
          setStats({ position: "-", matches: 0, goals: 0, saves: 0, assists: 0, wins: 0, ratingAvg: 0 });
        }
        // Mantém outras seções vazias por enquanto (sem API dedicada)
        setMedia({ items: [], totals: { views: 0, likes: 0, comments: 0 } });
        setCompetitions([]);
        setRecs([]);
        setFeedback([]);
      } catch (e) {
        console.error("Erro ao carregar dashboard:", e);
        if (isMounted) setStats({ position: "-", matches: 0, goals: 0, saves: 0, assists: 0, wins: 0, ratingAvg: 0 });
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadAll();
    return () => {
      isMounted = false;
    };
  }, [playerId]);

  // Dados simulados para visualizar o dashboard "cheio"
  function applyMock() {
    const now = Date.now();
    const days = (d) => new Date(now - d * 24 * 60 * 60 * 1000).toISOString();

    const mockStats = {
      position: "Atacante",
      matches: 18,
      goals: 12,
      saves: 4,
      assists: 6,
      wins: 11,
      ratingAvg: 8.3,
    };
    const mockMediaItems = [
      { title: "Golaço de fora da área", createdAt: days(30), views: 850, likes: 210, comments: 12 },
      { title: "Hat-trick na semifinal", createdAt: days(20), views: 1320, likes: 410, comments: 30 },
      { title: "Assistência mágica", createdAt: days(10), views: 640, likes: 150, comments: 9 },
      { title: "Melhores momentos do mês", createdAt: days(2), views: 980, likes: 260, comments: 14 },
    ];
    const mockMediaTotals = mockMediaItems.reduce((acc, i) => {
      acc.views += i.views; acc.likes += i.likes; acc.comments += i.comments; return acc;
    }, { views: 0, likes: 0, comments: 0 });

    const mockCompetitions = [
      { name: "Copa Passa a Bola", status: "inscrita" },
      { name: "Liga Metropolitana", status: "concluída" },
      { name: "Torneio Primavera", status: "inscrita" },
      { name: "Copa Regional", status: "concluída" },
      { name: "Peneira Sub-20", status: "aberta" },
    ];

    const mockRecs = [
      { team: "EC Aurora", distanceKm: 6 },
      { team: "Fênix FC", distanceKm: 12 },
      { team: "Atlético Jardim", distanceKm: 21 },
      { team: "União Norte", distanceKm: 35 },
    ];

    const mockFeedback = [
      { date: days(28), rating: 7.5 },
      { date: days(21), rating: 8.0 },
      { date: days(14), rating: 8.6 },
      { date: days(7), rating: 8.2 },
      { date: days(1), rating: 8.9 },
    ];

    setStats(mockStats);
    setMedia({ items: mockMediaItems, totals: mockMediaTotals });
    setCompetitions(mockCompetitions);
    setRecs(mockRecs);
    setFeedback(mockFeedback);
    setUsingMock(true);
  }

  async function removeMockAndReload() {
    setUsingMock(false);
    // Recarrega dados reais
    try {
      if (!playerId) return;
      setLoading(true);
      const res = await fetch(`${API_BASE}/user/${playerId}`);
      const data = await res.json();
      if (data?.success) {
        const mappedStats = {
          position: data.position || "-",
          matches: Array.isArray(data.matches) ? data.matches.length : (Number(data.matches) || 0),
          goals: Number(data.gols || 0),
          saves: Number(data.defesas || 0),
          assists: 0,
          wins: 0,
          ratingAvg: 0,
        };
        setStats(mappedStats);
      } else {
        setStats({ position: "-", matches: 0, goals: 0, saves: 0, assists: 0, wins: 0, ratingAvg: 0 });
      }
      setMedia({ items: [], totals: { views: 0, likes: 0, comments: 0 } });
      setCompetitions([]);
      setRecs([]);
      setFeedback([]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const perfNote = useMemo(() => {
    if (!stats) return "-";
    const { ratingAvg = 0 } = stats;
    return Number(ratingAvg || 0).toFixed(1);
  }, [stats]);

  // Dados para gráficos
  const radarData = useMemo(() => {
    if (!stats) return [];
    const values = [
      { name: "Jogos", v: stats.matches || 0 },
      { name: "Gols", v: stats.goals || 0 },
      { name: "Assistências", v: stats.assists || 0 },
      { name: "Vitórias", v: stats.wins || 0 },
      { name: "Nota", v: (stats.ratingAvg || 0) },
    ];
    const max = Math.max(1, ...values.map((x) => x.v));
    return values.map((x) => ({ subject: x.name, value: Math.round((x.v / max) * 100) }));
  }, [stats]);

  const mediaSeries = useMemo(() => {
    const items = (media?.items || [])
      .slice()
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return items.map((i) => ({
      date: new Date(i.createdAt).toLocaleDateString(),
      views: i.views,
      likes: i.likes,
      comments: i.comments,
      title: i.title,
    }));
  }, [media]);

  const competitionsSeries = useMemo(() => {
    const map = new Map();
    for (const c of (competitions || [])) {
      map.set(c.status, (map.get(c.status) || 0) + 1);
    }
    return Array.from(map.entries()).map(([status, count]) => ({ status, count }));
  }, [competitions]);

  

  const recsSeries = useMemo(() => {
    return (recs || []).map((r) => ({ team: r.team, distance: r.distanceKm }));
  }, [recs]);

  const feedbackSeries = useMemo(() => {
    return (feedback || [])
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((f) => ({ date: new Date(f.date).toLocaleDateString(), rating: f.rating }));
  }, [feedback]);

  if (!playerId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl">
        Não foi possível identificar a jogadora. Abra o perfil por uma URL com id.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-10 text-gray-500">Carregando dashboard…</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barra de ações rápidas */}
      <div className="flex flex-wrap items-center gap-3">
        {!usingMock ? (
          <button
            type="button"
            onClick={applyMock}
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-900 text-white hover:bg-black"
            title="Preencher o dashboard com dados de exemplo"
          >
            Ver com dados simulados
          </button>
        ) : (
          <button
            type="button"
            onClick={removeMockAndReload}
            className="px-3 py-1.5 rounded-lg text-sm bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
            title="Voltar a exibir somente dados reais"
          >
            Voltar aos dados reais
          </button>
        )}
        {usingMock && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            Visualizando dados simulados
          </span>
        )}
      </div>

      {/* Navegação por abas + Filtro de período */}
      <div className="flex flex-col gap-3">
        <div role="tablist" aria-label="Seções do dashboard" className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${tab === t ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="hidden md:block">Período:</span>
          {(["7 dias", "30 dias", "90 dias", "Tudo"]).map((p) => (
            <button
              key={p}
              aria-label={`Filtrar por ${p}`}
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-1 rounded border text-xs ${period === p ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      {/* Visão geral */}
      {tab === "Visão geral" && (
      <Section title="Estatísticas pessoais (Radar)">
        {radarData.length ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius={90}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar name="Índice" dataKey="value" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.25} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0];
                  return (
                    <div className="bg-white border rounded-md p-2 text-xs shadow">
                      <div className="font-medium">{label}</div>
                      <div className="text-gray-600">Índice relativo: {p.value}</div>
                      <div className="text-gray-500">Dica: mantenha consistência ao longo da temporada.</div>
                    </div>
                  );
                }} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Sem dados.</div>
        )}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Posição" value={stats?.position || "-"} color="text-gray-800" />
          <StatCard label="Nota média" value={perfNote} color="text-amber-600" />
          <StatCard label="Jogos" value={stats?.matches ?? 0} />
          <StatCard label="Gols" value={stats?.goals ?? 0} color="text-green-600" />
          <StatCard label="Defesas" value={stats?.saves ?? 0} color="text-blue-600" />
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Resumo: você disputou <span className="font-semibold">{stats?.matches ?? 0}</span> jogos, marcou <span className="font-semibold">{stats?.goals ?? 0}</span> gol(s), realizou <span className="font-semibold">{stats?.saves ?? 0}</span> defesa(s) e tem nota média <span className="font-semibold">{perfNote}</span>.
        </p>
      </Section>
      )}

      {/* Mídia */}
      {tab === "Mídia" && (
      <Section title="Mídia (vídeos e engajamento)" right={<span className="text-sm text-gray-500">Total vídeos: {media?.items?.length || 0}</span>}>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <StatCard label="Visualizações" value={media?.totals?.views ?? 0} />
          <StatCard label="Curtidas" value={media?.totals?.likes ?? 0} color="text-pink-600" />
          <StatCard label="Comentários" value={media?.totals?.comments ?? 0} color="text-indigo-600" />
        </div>
        {mediaSeries.length ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <LineChart data={mediaSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const m = Object.fromEntries(payload.map(p => [p.dataKey, p.value]));
                  return (
                    <div className="bg-white border rounded-md p-2 text-xs shadow">
                      <div className="font-medium">{label}</div>
                      <div>👁️ {m.views} visualizações</div>
                      <div>❤️ {m.likes} curtidas</div>
                      <div className="text-gray-500">Mantenha uma cadência de postagem para crescer.</div>
                    </div>
                  );
                }} />
                <Legend />
                <Line type="monotone" dataKey="views" name="Visualizações" stroke="#7c3aed" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="likes" name="Curtidas" stroke="#ec4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Sem vídeos enviados.</div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          Dica: títulos claros e miniaturas atrativas ajudam a aumentar as visualizações e o engajamento.
        </p>
      </Section>
      )}

      {/* Competições */}
      {tab === "Competições" && (
      <Section title="Competições e peneiras">
        {competitionsSeries.length ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={competitionsSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const v = payload[0]?.value;
                  return (
                    <div className="bg-white border rounded-md p-2 text-xs shadow">
                      <div className="font-medium">{label}</div>
                      <div>{v} competição(ões)</div>
                      <div className="text-gray-500">Acompanhe os períodos de inscrição para não perder oportunidades.</div>
                    </div>
                  );
                }} />
                <Legend />
                <Bar dataKey="count" name="Qtd" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Sem competições registradas.</div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          Resumo: {competitions.filter(c=>c.status==="inscrita").length} inscrita(s) • {competitions.filter(c=>c.status==="concluída").length} concluída(s).
        </p>
      </Section>
      )}


      {/* Recomendações */}
      {tab === "Recomendações" && (
      <Section title="Recomendações de times próximos (distância)">
        {recsSeries.length ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <BarChart data={recsSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" interval={0} angle={-15} textAnchor="end" height={70} />
                <YAxis label={{ value: "km", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="distance" name="Distância (km)" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Sem recomendações no momento.</div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          Dica: adicione sua localização aproximada para melhorar recomendações de proximidade.
        </p>
      </Section>
      )}

      {/* Feedback técnico */}
      {tab === "Feedback" && (
      <Section title="Feedback técnico (notas ao longo do tempo)">
        {feedbackSeries.length ? (
          <div className="w-full h-72">
            <ResponsiveContainer>
              <LineChart data={feedbackSeries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const v = payload[0]?.value;
                  return (
                    <div className="bg-white border rounded-md p-2 text-xs shadow">
                      <div className="font-medium">{label}</div>
                      <div>Nota: {v}/10</div>
                      <div className="text-gray-500">Observe as tendências e peça mais feedbacks objetivos.</div>
                    </div>
                  );
                }} />
                <Legend />
                <Line type="monotone" dataKey="rating" name="Nota" stroke="#f97316" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Sem feedback registrado.</div>
        )}
        <p className="mt-3 text-sm text-gray-600">
          Média atual: <span className="font-semibold">{perfNote}</span>. Último feedback ajuda a guiar treinamentos específicos.
        </p>
      </Section>
      )}
    </div>
  );
}
