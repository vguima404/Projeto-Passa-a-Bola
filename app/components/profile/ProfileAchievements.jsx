import { FaMedal } from "react-icons/fa";

export default function ProfileAchievements({ profile }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Conquistas</h3>
      <div className="flex flex-wrap gap-3">
        {(profile.achievements || []).length === 0 && (
          <p className="text-sm text-gray-500">Nenhuma conquista registrada.</p>
        )}
        {(profile.achievements || []).map((ach, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 bg-gray-100 border rounded-lg px-3 py-1 text-sm"
          >
            <FaMedal className="text-yellow-500" />
            {ach}
          </span>
        ))}
      </div>
    </div>
  );
}