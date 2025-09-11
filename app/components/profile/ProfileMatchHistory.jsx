export default function ProfileMatchHistory({ profile }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Histórico de Partidas</h3>
      </div>
      <ul className="space-y-3">
        {(profile.matches || []).map((m, i) => {
          const isWin = m.goalsFor > m.goalsAgainst;
          const isLoss = m.goalsFor < m.goalsAgainst;
          return (
            <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">{m.date} • {m.competition}</div>
                <div className="font-semibold">{m.opponent}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${isWin ? "text-green-600" : isLoss ? "text-red-600" : "text-gray-700"}`}>
                  {m.goalsFor} x {m.goalsAgainst}
                </div>
                <div className="text-sm text-gray-500">{isWin ? "Vitória" : isLoss ? "Derrota" : "Empate"}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}