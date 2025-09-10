import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Logo + slogan */}
        <div className="flex items-center space-x-4 text-center md:text-left">
          <img
            src="/passa-a-bola-logo.png"
            alt="Logo Passa a Bola"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h3 className="text-2xl font-bold text-white">Passa a Bola</h3>
            <p className="text-gray-400 text-sm">
              Transformando o esporte em impacto social
            </p>
          </div>
        </div>

        {/* Redes sociais */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://www.tiktok.com/@passabola"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.youtube.com/@passabola"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/passaabola"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Linha final */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
      </div>
    </footer>
  );
}
