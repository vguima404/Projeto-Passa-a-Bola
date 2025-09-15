import Link from 'next/link';
import { FaUser, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';



const HeaderComunidade = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = (isDrawer = false) => (
    <ul className={
      isDrawer
        ? "flex flex-col gap-8 text-center items-center w-full"
        : "flex flex-row gap-4 md:gap-8 lg:gap-10 text-base md:text-lg items-center whitespace-nowrap"
    }>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200" href="/PosLogin/1" onClick={()=>setMenuOpen(false)}>
          Início
        </Link>
      </li>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200" href="/Comunidade/1/Highlights" onClick={()=>setMenuOpen(false)}>
          Highlights
        </Link>
      </li>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200" href="/Comunidade/1/ProximosJogos" onClick={()=>setMenuOpen(false)}>
          Próximos Jogos
        </Link>
      </li>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200" href="/Comunidade/1/BrasileiraoFeminino" onClick={()=>setMenuOpen(false)}>
          Brasileirão Feminino
        </Link>
      </li>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200" href="/Comunidade/1/Estatisticas" onClick={()=>setMenuOpen(false)}>
          Estatísticas
        </Link>
      </li>
      <li>
        <Link className="text-white font-semibold px-3 py-1 rounded-xl hover:bg-white/20 transition-all duration-200 flex items-center gap-2 justify-center" href="/MeuPerfil/1" onClick={()=>setMenuOpen(false)}>
          <FaUser className="inline-block text-lg" />
          Meu Perfil
        </Link>
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
    <header
      className="w-full flex justify-between items-center py-4 z-50 px-4 md:px-10 lg:px-24 xl:px-24 shadow-xl fixed top-0 left-0 right-0"
      style={{
        background: 'linear-gradient(90deg, #7c3aed 0%, #312e81 100%)',
        boxShadow: "0 4px 24px 0 rgba(124,58,237,0.10)",
      }}
    >
      {/* Logo */}
      <img
        src="/passa-a-bola-logo.png"
        alt="Logo Passa a Bola"
        width={60}
        height={60}
        className="drop-shadow-lg"
      />

      {/* Menu desktop */}
      <nav className="hidden lg:hidden xl:flex ">
        {navLinks()}
      </nav>

      {/* Botão hamburguer só aparece em telas <1024px e quando o menu não está aberto */}
      {!menuOpen && (
        <button
          className="block lg:block xl:hidden text-white text-3xl focus:outline-none z-50"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Overlay do menu mobile (só aparece quando menuOpen) */}
      {menuOpen && (
        <>
          {/* Overlay escuro */}
          <div className="fixed inset-0 bg-opacity-60 z-40 transition-all" onClick={() => setMenuOpen(false)}></div>
          {/* Drawer lateral */}
          <div
            className="fixed top-0 right-0 h-full w-full sm:w-80 md:w-80 lg:w-80 z-50 flex flex-col items-center justify-center transition-transform duration-300 lg:flex"
            style={{ maxWidth: '100vw',
              backgroundImage: 'linear-gradient(90deg, #7c3aed 0%, #312e81 100%)'
          }}
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
}

export default HeaderComunidade;
