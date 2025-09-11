export default function ProfileTeam({ profile, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Time</h3>
      {profile.team ? (
        <div>
          <div className="font-semibold">{profile.team.name}</div>
          <div className="text-sm text-gray-500">Membros: {profile.team.members?.length || 0}</div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Sem time cadastrado.</p>
          <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 transition-colors duration-300 hover:cursor-pointer text-white rounded-lg" onClick={onEdit}>
            Criar/Editar Time
          </button>
        </div>
      )}
    </div>
  );
}