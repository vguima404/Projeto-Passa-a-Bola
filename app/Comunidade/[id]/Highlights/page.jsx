"use client";

import HeaderComunidade from "../../../components/HeaderComunidade";
import HighlightCard from "../../../components/HighlightCard";
import Footer from "../../../components/Footer";


<HighlightCard />

const Highlights = () => {
  const videos = [
    { videoUrl: "#", jogador: "Ana Silva" },
    { videoUrl: "#", jogador: "Mariana Souza" },
    { videoUrl: "#", jogador: "Carla Mendes" },
    { videoUrl: "#", jogador: "Beatriz Lima" },
    { videoUrl: "#", jogador: "Fernanda Rocha" },
    { videoUrl: "#", jogador: "Julia Oliveira" },
  ];

  return (
    <>
    <HeaderComunidade />
    <div
      className="min-h-screen p-0 md:p-8 flex flex-col items-center justify-start pt-24 md:pt-28"
      style={{
        backgroundImage: " linear-gradient(90deg, rgba(9, 8, 20, 0.63) 0%, rgba(9, 31, 49, 0.7) 35%, rgba(2, 11, 22, 0.767) 100%), url('/campoFutebol2.jpg')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Card de destaque */}
      <div className="w-full max-w-4xl mx-auto mt-10 mb-8 bg-white/2  0 rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4 border border-purple-200">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2 flex items-center gap-2 drop-shadow">
          <span role="img" aria-label="Câmera">🎥</span> Highlights da Comunidade
        </h1>
        <p className="text-lg text-gray-100 text-center max-w-2xl">
          Veja os melhores momentos das nossas jogadoras! Compartilhe, inspire-se e faça parte dessa rede de talentos. Envie seu vídeo para aparecer aqui!
        </p>
        <a
          href="#enviar"
          className="mt-2 px-6 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition-all duration-300"
        >
          Enviar meu highlight
        </a>
      </div>

      {/* Grid moderna */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2 md:px-0 mb-16">
        {videos.map((v, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-xl bg-white/90 border border-purple-100 hover:scale-105 hover:shadow-2xl transition-transform duration-300 flex flex-col items-center"
          >
            <HighlightCard videoUrl={v.videoUrl} jogador={v.jogador} />
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Highlights;
