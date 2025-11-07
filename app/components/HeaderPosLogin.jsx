import Link from 'next/link';
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://projeto-passa-a-bola.onrender.com";

const HeaderPosLogin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Função para lidar com clique em "Meu Perfil"
  const handleMeuPerfilClick = async () => {
  const userId = localStorage.getItem("user_id");
  if (!userId) {
    alert("Usuário não logado.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/user/${userId}`);
    const data = await res.json();

    if (data.success) {
      if (data.cpf) {
        router.push(`/PerfilJogadora/${userId}`);
      } else if (data.olheiro) {
        router.push(`/PerfilOlheiro/${userId}`);
      } else {
        router.push(`/MeuPerfil/${userId}`);
      }
    } else {
      alert("Erro ao buscar perfil: " + data.message);
    }
  } catch (err) {
    console.error("Erro ao buscar perfil:", err);
    alert("Erro ao buscar perfil.");
  }
};

  const navLinks = (isDrawer = false) => (
    <ul className={
      isDrawer
        ? "flex flex-col gap-8 text-center items-center w-full"
        : "flex flex-col lg:flex-row gap-8 lg:gap-10 text-center lg:text-left"
    }>
      <li>
        <Link className="text-white font-poppins text-xl font-semibold hover:underline" href="#">
          Início
        </Link>
      </li>
      <li>
        <a
          className="text-white font-poppins text-xl font-semibold hover:underline cursor-pointer"
          href="#sobre"
          onClick={e => { e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'}); setMenuOpen(false); }}
        >
          Sobre
        </a>
      </li>
      <li>
        <a
          className="text-white font-poppins text-xl font-semibold hover:underline cursor-pointer"
          href="#campeonato"
          onClick={e => { e.preventDefault(); document.getElementById('campeonato')?.scrollIntoView({behavior: 'smooth'}); setMenuOpen(false); }}
        >
          Campeonato
        </a>
      </li>
      <li>
        <Link className="text-white font-poppins text-xl font-semibold hover:underline" href="/Comunidade/1/Highlights/" onClick={() => setMenuOpen(false)}>
          Comunidade
        </Link>
      </li>
      <li>
        <Link className="text-white font-poppins text-xl font-semibold hover:underline" href="/Loja/1" onClick={() => setMenuOpen(false)}>
          Loja
        </Link>
      </li>
      <li>
        {/* Aqui aplicamos a nova lógica de clique */}
        <button
          onClick={handleMeuPerfilClick}
          className="text-white font-poppins text-xl font-semibold flex items-center gap-2 justify-center hover:underline"
        >
          <FaUser className="inline-block text-lg" />
          Meu perfil
        </button>
      </li>
      <ul>
        <Link
          className="text-white font-poppins text-xl font-semibold hover:underline flex items-center gap-2 justify-center"
          href="/"
          onClick={() => {
            localStorage.removeItem("user_id");
            setMenuOpen(false);
          }}
        >
          Logout
          <FaSignOutAlt className="inline-block text-lg" />
        </Link>
      </ul>
    </ul>
  );

  return (
    <header className="w-full flex justify-between items-center py-5 z-50 px-6 md:px-10 lg:px-56 relative">
      <img src="/passa-a-bola-logo.png" alt="Logo Passa Bola Branca" width={60} height={60} />

      {/* Menu desktop */}
      <nav className="hidden lg:hidden xl:block">
        {navLinks()}
      </nav>

      {/* Botão hamburguer */}
      {!menuOpen && (
        <button
          className="block lg:block xl:hidden text-white text-3xl focus:outline-none z-50"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Overlay e drawer mobile */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-opacity-60 z-40 transition-all" onClick={() => setMenuOpen(false)}></div>
          <div
            className="fixed top-0 right-0 h-full w-full sm:w-80 md:w-80 lg:w-80 bg-purple-500 z-50 flex flex-col items-center justify-center transition-transform duration-300 lg:flex-col lg:flex lg:top-0 lg:h-full xl:hidden"
            style={{ maxWidth: '100vw', backgroundImage: 'linear-gradient(90deg, #7c3aed 0%, #312e81 100%)' }}
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>
            <nav>
              {navLinks(true)}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default HeaderPosLogin;
