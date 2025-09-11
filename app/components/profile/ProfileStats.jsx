export default function ProfileStats({ profile }) {
  const games = profile.matches || [];
  const played = games.length;
  const wins = games.filter((m) => m.goalsFor > m.goalsAgainst).length;
  const draws = games.filter((m) => m.goalsFor === m.goalsAgainst).length;
  const losses = games.filter((m) => m.goalsFor < m.goalsAgainst).length;

  return (
    <div className="bg-gray-50 p-4 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <p className="text-2xl font-bold text-purple-600">{played}</p>
        <p className="text-sm text-gray-500">Jogos</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-green-600">{wins}</p>
        <p className="text-sm text-gray-500">Vitórias</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-yellow-600">{draws}</p>
        <p className="text-sm text-gray-500">Empates</p>
      </div>
      <div>
        <p className="text-2xl font-bold text-red-600">{losses}</p>
        <p className="text-sm text-gray-500">Derrotas</p>
      </div>
    </div>
  );
}