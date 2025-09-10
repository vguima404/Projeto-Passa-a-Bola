export default function Campeonato() {
  return (
    <section id="campeonato" className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Texto + Imagem */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Copa Passa a Bola: quando futebol feminino vira espetáculo
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              A <span className="font-semibold text-purple-600">Copa Passa a Bola</span> é mais que um torneio:
              é uma celebração do futebol feminino. Criada por <strong>Alê Xavier e Luana Maluf</strong>, a
              competição busca ampliar a presença das mulheres no esporte, em um ambiente criativo,
              descontraído e cheio de energia.
            </p>
            <p className="text-lg text-gray-700">
              Com jogos entre influenciadoras, atletas e convidadas especiais, o campeonato gera conteúdos
              únicos para <span className="font-semibold">YouTube, Instagram e TikTok</span>, unindo
              entretenimento, técnica e engajamento.
            </p>
          </div>
          <img
            src="/grupo.jpg"
            alt="Grupo de jogadoras reunidas em grupo junto com a Ale Xavier e Luana Maluf"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Cards em roxo */}
        <div className="bg-purple-600 text-white rounded-3xl p-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="text-2xl font-semibold mb-3">Quem joga?</h4>
            <p className="text-gray-100 text-balance">
              Influenciadoras digitais, atletas e convidadas se encontram em campo para desafios cheios de emoção.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-semibold mb-3">Onde acompanhar?</h4>
            <p className="text-gray-100 text-balance">
              Os melhores momentos estão no YouTube, Instagram e TikTok, com humor, técnica e proximidade com os fãs.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-semibold mb-3 ">Por que existe?</h4>
            <p className="text-gray-100 text-balance">
              A Copa nasceu para dar visibilidade ao futebol feminino e inspirar novas gerações a ocuparem seu espaço no esporte.
            </p>
          </div>
        </div>

        {/* Encerramento */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Mais do que partidas, a Copa é um movimento que inspira e conecta pessoas.
          </h3>
          <a
            href="#jogos"
            className="inline-block px-8 py-3 rounded-2xl bg-purple-600 text-white font-medium shadow hover:bg-transparent hover:text-purple-600 hover:border transition duration-500"
          >
            Veja os próximos jogos
          </a>
        </div>
      </div>
    </section>
  );
}
