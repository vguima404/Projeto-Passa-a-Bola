This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## API Endpoints (Documentação)

### Exemplo de endpoints utilizados no frontend:

- **Buscar jogos do campeonato**

  - `GET https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases/{fase_id}`
  - Parâmetros: `campeonato_id` (ID do campeonato), `fase_id` (ID da fase)
  - Retorna: Dados das partidas da fase

- **Buscar fases do campeonato**

  - `GET https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases`
  - Parâmetros: `campeonato_id` (ID do campeonato)
  - Retorna: Lista de fases disponíveis

- **Buscar endereço por CEP**
  - `GET https://viacep.com.br/ws/{cep}/json/`
  - Parâmetros: `cep` (CEP brasileiro)
  - Retorna: Dados de endereço (logradouro, bairro, cidade, estado)

Adapte conforme novos endpoints forem utilizados no projeto.
