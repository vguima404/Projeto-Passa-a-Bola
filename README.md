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

### Endpoints do Backend Flask (MongoDB)

- **Login usuário:**  
  `POST http://localhost:5000/login`

- **Login admin:**  
  `POST http://localhost:5000/admin-login`

- **Cadastro de usuário:**  
  `POST http://localhost:5000/register`

- **Buscar todos os usuários:**  
  `GET http://localhost:5000/users`

- **Buscar usuário por ID:**  
  `GET http://localhost:5000/user/<user_id>`

- **Atualizar usuário:**  
  `PUT http://localhost:5000/user/<user_id>`

- **Remover usuário:**  
  `DELETE http://localhost:5000/user/<user_id>`

- **Atualizar estatísticas (gols/defesas):**  
  `PUT http://localhost:5000/user/<user_id>/estatisticas`

- **Atualizar status do RG:**  
  `PUT http://localhost:5000/user/<user_id>/rg`

- **Remover highlight (MVP):**  
  `DELETE http://localhost:5000/highlight/<highlight_id>`

- **Buscar estatísticas de gols e defesas (todos os usuários):**  
  `GET http://localhost:5000/estatisticas`

- **Buscar estatísticas de gols e defesas (usuário específico):**  
  `GET http://localhost:5000/user/<user_id>/estatisticas`

---

### Endpoints da API Futebol (Brasileirão Feminino)

- **Buscar partidas do Brasileirão Feminino Série A1:**  
  `GET https://api.api-futebol.com.br/v1/campeonatos/71/partidas`  
  _(Header: Authorization: Bearer test_698f6775d842f26a03f89bd4ec09f4)_

- **Buscar jogos do campeonato (por fase):**  
  `GET https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases/{fase_id}`

- **Buscar fases do campeonato:**  
  `GET https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases`

---

### Endpoints de Serviços Externos

- **Buscar endereço por CEP (ViaCEP):**  
  `GET https://viacep.com.br/ws/{cep}/json/`

---

### Resumo dos Endpoints

```text
# Backend Flask
POST    http://localhost:5000/login
POST    http://localhost:5000/admin-login
POST    http://localhost:5000/register
GET     http://localhost:5000/users
GET     http://localhost:5000/user/<user_id>
PUT     http://localhost:5000/user/<user_id>
DELETE  http://localhost:5000/user/<user_id>
PUT     http://localhost:5000/user/<user_id>/estatisticas
PUT     http://localhost:5000/user/<user_id>/rg
DELETE  http://localhost:5000/highlight/<highlight_id>
GET     http://localhost:5000/estatisticas
GET     http://localhost:5000/user/<user_id>/estatisticas

# API Futebol
GET     https://api.api-futebol.com.br/v1/campeonatos/71/partidas
GET     https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases/{fase_id}
GET     https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases

# ViaCEP
GET     https://viacep.com.br/ws/{cep}/json/
```
