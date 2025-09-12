
import Link from 'next/link';
import { FaUser, FaShoppingCart } from 'react-icons/fa';


const HeaderPosLogin = () => {
  return (
    <header className="w-full flex justify-between items-center py-5 z-50 px-10 md:px-56">
        <img src="/passa-a-bola-logo.png" alt="Logo Passa Bola Branca" width={60} height={60} />
        <nav>
          <ul className="flex gap-10">
            <li>
              <Link className="text-white font-semibold hover:underline" href="#">
                Início
              </Link>
            </li>
            <li>
              <a
                className="text-white font-semibold hover:underline cursor-pointer"
                href="#sobre"
                onClick={e => {e.preventDefault(); document.getElementById('sobre')?.scrollIntoView({behavior: 'smooth'});}}
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                className="text-white font-semibold hover:underline cursor-pointer"
                href="#campeonato"
                onClick={e => {e.preventDefault(); document.getElementById('campeonato')?.scrollIntoView({behavior: 'smooth'});}}
              >
                Campeonato
              </a>
            </li>
            <li>
              <Link className="text-white font-semibold hover:underline" href="#">
                Comunidade
              </Link>
            </li>
            <li>
              <Link className="text-white font-semibold hover:underline" href="/Loja/1">
                Loja
              </Link>
            </li>
            <li>
              <Link className="text-white font-semibold hover:underline flex items-center gap-2" href="/MeuPerfil/1">
                <FaUser className="inline-block text-lg" />
                Meu Perfil
              </Link>
            </li>
              </ul>
        </nav>
      </header>
  );
}

export default HeaderPosLogin;