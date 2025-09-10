import Link from "next/link";

export default function Sobre() {
  return (
    <section id="sobre" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Introdução */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mais que um jogo, um movimento de transformação
          </h2>
          <p className="text-lg text-gray-600">
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
            <h3 className="text-2xl font-semibold mb-4">Nossa História</h3>
            <p className="text-gray-600 mb-4">
              Criado em 2015, o Passa a Bola nasceu da ideia de que o esporte pode ser uma
              poderosa ferramenta de transformação. Hoje, alcançamos centenas de jovens em
              diferentes comunidades, promovendo inclusão social e novas oportunidades.
            </p>
            <p className="text-gray-600">
              Mais do que treinar habilidades esportivas, buscamos desenvolver valores como
              respeito, disciplina, trabalho em equipe e solidariedade.
            </p>
          </div>
        </div>

        {/* Missão, Visão e Valores */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Missão</h4>
            <p className="text-gray-600">
              Promover inclusão e transformação social por meio do esporte.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Visão</h4>
            <p className="text-gray-600">
              Ser referência nacional em projetos sociais esportivos.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl shadow-sm">
            <h4 className="text-xl font-semibold mb-2">Valores</h4>
            <p className="text-gray-600">
              Respeito, comunidade, diversidade e sustentabilidade.
            </p>
          </div>
        </div>


        {/* Encerramento */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Junte-se a nós para transformar vidas através do esporte.
          </h3>
          <Link
            href="/Cadastro/1"
            className="inline-block px-8 py-3 rounded-2xl bg-purple-600 text-white font-medium shadow hover:bg-transparent hover:text-purple-600 hover:border transition duration-500"
          >
            Cadastre-se!
          </Link>
        </div>
      </div>
    </section>
  );
}
