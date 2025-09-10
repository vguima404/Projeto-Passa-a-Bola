import Link from 'next/link';


const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-600 to-pink-500 shadow-md"
    >
      <nav className="flex justify-evenly transition-all duration-200 text-lg items-center gap-10 py-5">
        <h2 className="text-white hover:text-xl transition-all duration-300 font-semibold cursor-pointer">Inicio</h2>
        <h2 className="text-white hover:text-xl transition-all duration-300 font-semibold cursor-pointer">Campeonato</h2>
        <h2 className="text-white hover:text-xl transition-all duration-300 font-semibold cursor-pointer">Calendário de Jogos</h2>
        <h2 className="text-white hover:text-xl transition-all duration-300 font-semibold cursor-pointer">Comunidade</h2>
        <Link className="text-white hover:text-xl transition-all duration-300 font-semibold cursor-pointer" href={`/Cadastro/1`}>Meu perfil</Link>
      </nav>
    </header>
  );
}

export default Header;