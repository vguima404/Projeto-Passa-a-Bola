import { FaUser, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function ProfileHeader({ profile, onEdit }) {
  return (
    <div className="w-full md:w-1/3 flex flex-col items-center text-center">
      <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-purple-600 bg-gray-100 flex items-center justify-center">
        {profile.photoUrl ? (
          <img src={profile.photoUrl} alt={profile.name} className="w-full h-full object-cover" />
        ) : (
          <FaUser className="text-4xl text-gray-400" />
        )}
      </div>
      <h2 className="mt-4 text-xl font-bold text-gray-800">{profile.name || "Meu Perfil"}</h2>
      {profile.position && <p className="text-purple-600 font-semibold">{profile.position}</p>}
      {profile.cpf && <p className="text-sm text-gray-500 mt-1">CPF: {profile.cpf}</p>}

      <div className="flex gap-3 mt-4">
        {profile.socials?.instagram && (
          <a href={profile.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors duration-300">
            <FaInstagram size={20} />
          </a>
        )}
        {profile.socials?.facebook && (
          <a href={profile.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors duration-300">
            <FaFacebook size={20} />
          </a>
        )}
        {profile.socials?.tiktok && (
          <a href={profile.socials.tiktok} target="_blank" rel="noreferrer" className="hover:text-purple-600 transition-colors duration-300">
            <FaTiktok size={20} />
          </a>
        )}
      </div>

      <button
        onClick={onEdit}
        className="mt-6 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer transition-colors duration-300"
      >
        Editar Perfil
      </button>
    </div>
  );
}