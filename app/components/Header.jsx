

import Link from 'next/link';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';



const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Os links do menu lateral devem sempre ser coluna, então passamos uma prop para controlar o layout
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
          onClick={e => {e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'}); setMenuOpen(false);}}
        >
          Sobre
        </a>
      </li>
      <li>
        <a
          className="text-white font-poppins text-xl font-semibold hover:underline cursor-pointer"
          href="#campeonato"
          onClick={e => {e.preventDefault(); document.getElementById('campeonato')?.scrollIntoView({behavior: 'smooth'}); setMenuOpen(false);}}
        >
          Campeonato
        </a>
      </li>
      <li>
        <Link className="text-white font-poppins text-xl font-semibold hover:underline" href="/Loja/1" onClick={()=>setMenuOpen(false)}>
          Loja
        </Link>
      </li>
      <li>
        <Link className="text-white font-poppins text-xl font-semibold hover:underline flex items-center gap-2 justify-center" href="/Login/1" onClick={()=>setMenuOpen(false)}>
          Login
          <FaUser className="inline-block text-lg" />
        </Link>
      </li>
    </ul>
  );

  return (
    <header className="w-full flex justify-between items-center py-5 z-50 px-6 md:px-10 lg:px-56 relative">
      <img src="/passa-a-bola-logo.png" alt="Logo Passa Bola Branca" width={60} height={60} />

      {/* Menu desktop (aparece em telas >=1024px) */}
      <nav className="hidden lg:hidden xl:block">
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
            className="fixed top-0 right-0 h-full w-full sm:w-80 md:w-80 lg:w-80 bg-purple-500 z-50 flex flex-col items-center justify-center transition-transform duration-300 lg:flex-col lg:flex lg:top-0 lg:h-full xl:hidden"
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

export default Header;