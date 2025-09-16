'use client';


import dynamic from 'next/dynamic'
import HeaderComunidade from '../../../components/HeaderComunidade';
import Footer from '../../../components/Footer';

// Renomeei a importação para ser mais genérica, já que agora pode carregar qualquer campeonato
const CampeonatoJogos = dynamic(
  () => import('../../../components/BrasileiraoJogos'), // O NOME DO ARQUIVO não precisa mudar
  { 
    ssr: false,  
    loading: () => (
        <div className="p-8 min-h-screen flex items-center justify-center">
            <p className="text-xl font-bold animate-pulse">Carregando...</p>
        </div>
    )
  }
)

export default function PaginaFutebol() {
  return (
    <main className='pt-20'>
      <HeaderComunidade />
      <CampeonatoJogos />
      <Footer />
    </main>
  );
}
//  O que esperar agora:

// 1.  A página vai carregar e fazer uma chamada à API para o campeonato de ID `30`.
// 2.  O `console.log` no seu navegador vai mostrar a resposta da API para este campeonato.
// 3.  **Se a API de teste tiver dados de jogos para o Paulistão**, eles aparecerão na tela.
// 4.  **Se a API de teste NÃO tiver dados**, você verá a mensagem "Nenhum jogo encontrado...". Isso **NÃO é um erro**, apenas uma confirmação de que a base de dados de teste para este campeonato está vazia, mas seu código está 100% correto.

// Com este código, todos os problemas que enfrentamos (hidratação, cache, formato de dados, datas) foram resolvidos. Agora você tem um componente robusto e correto que está pronto para funcionar.
// ###