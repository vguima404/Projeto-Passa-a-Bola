"use client";

import { useState, useEffect } from "react";
import { FaTiktok, FaYoutube, FaInstagram, FaQuestionCircle, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const [showHelp, setShowHelp] = useState(false);

  // fecha com ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowHelp(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 relative">
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
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-2 text-sm cursor-pointer md:text-base bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
            title="Ajuda e documentação"
          >
            <FaQuestionCircle className="text-lg" />
            Ajuda
          </button>
          {/* Ícones sociais */}
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
      </div>

      {/* Linha final */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Passa a Bola. Todos os direitos reservados.
      </div>

      {/* Modal de Ajuda / Documentação */}
      {showHelp && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowHelp(false)} />
          <div className="relative z-[61] w-[92%] max-w-2xl bg-white text-gray-800 rounded-2xl shadow-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">Ajuda e documentação</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-900 text-xl leading-none"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 text-sm">
              <section>
                <h4 className="font-semibold text-purple-700">Highlights (vídeos)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Para enviar: clique em <strong>“Enviar meu highlight”</strong>, cole o link (YouTube, TikTok ou Instagram) e opcionalmente defina título e descrição.</li>
                  <li>Likes, comentários e visualizações são salvos no seu navegador (localStorage).</li>
                  <li>Você pode remover highlights que você mesmo publicou neste dispositivo.</li>
                </ul>
              </section>
              <section>
                <h4 className="font-semibold text-purple-700">Perfil</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Atualize sua foto no menu <strong>Meu perfil</strong>.</li>
                  <li>Após login, seu nome e foto são usados automaticamente nos highlights e comentários.</li>
                </ul>
              </section>
              <section>
                <h4 className="font-semibold text-purple-700">Dúvidas frequentes</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Vídeo não aparece? Verifique se o link é público e compatível (YouTube/TikTok/Instagram).</li>
                  <li>Sem seu nome/foto? Faça login e recarregue a página.</li>
                </ul>
              </section>
              <section className="flex flex-wrap items-center gap-3 pt-2 border-t">
                <a
                  href="https://github.com/vguima404/Projeto-Passa-a-Bola#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:underline"
                >
                  Ver documentação completa (README)
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-700"
                  target="_blank"
                >
                  <FaEnvelope /> Fale com o suporte
                </a>
              </section>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
