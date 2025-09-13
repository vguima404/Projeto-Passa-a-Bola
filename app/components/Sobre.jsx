import Link from "next/link";

export default function Sobre() {
  return (
    <section
      id="sobre"
      className="relative py-20 px-6"
      style={{
        background: "linear-gradient(120deg, #5b21b6 0%, #0f172a 100%)",
        backgroundAttachment: "fixed",
      }}
    >
  <div className="max-w-6xl mx-auto space-y-16">
        {/* Introdução */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">
            Mais que um jogo, um movimento de transformação
          </h2>
          <p className="text-xl text-gray-200">
            O <span className="font-semibold">Passa a Bola</span> nasceu para conectar jovens e comunidades
            através do esporte. Nossa missão é transformar o futebol em uma ferramenta de inclusão,
            educação e impacto social.
          </p>
        </div>

        {/* Imagem + Texto */}
  <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/jogadas1.jpg"
            alt="Luana em disputa de bola com outra jogadora"
            className="rounded-2xl shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow">Nossa História</h3>
            <p className="text-gray-200 mb-4 text-xl">
              Criado em 2015, o Passa a Bola nasceu da ideia de que o esporte pode ser uma
              poderosa ferramenta de transformação. Hoje, alcançamos centenas de jovens em
              diferentes comunidades, promovendo inclusão social e novas oportunidades.
            </p>
            <p className="text-gray-200 text-xl">
              Mais do que treinar habilidades esportivas, buscamos desenvolver valores como
              respeito, disciplina, trabalho em equipe e solidariedade.
            </p>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-purple-800">Missão</h4>
            <p className="text-gray-700 text-lg">
              Promover inclusão e transformação social por meio do esporte.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-purple-800">Visão</h4>
            <p className="text-gray-700 text-lg">
              Ser referência nacional em projetos sociais esportivos.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2 text-purple-800">Valores</h4>
            <p className="text-gray-700 text-lg">
              Respeito, comunidade, diversidade e sustentabilidade.
            </p>
          </div>
        </div>


        {/* Encerramento */}
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-4 text-white drop-shadow">
            Junte-se a nós para transformar vidas através do esporte.
          </h3>
          <Link
            href="/Cadastro/1"
            className="inline-block text-lg px-8 py-3 rounded-2xl bg-purple-600 text-white font-medium shadow hover:bg-transparent hover:text-purple-600 hover:border transition duration-500"
          >
            Cadastre-se!
          </Link>
        </div>
      </div>
    </section>
  );
}
