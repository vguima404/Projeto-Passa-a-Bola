# ⚽Projeto Passa a Bola

Projeto web full-stack para gerenciar usuários, estatísticas, RG, destaques (MVP), com frontend em Next.js + backend em Flask + banco de dados MongoDB + integrações externas (API de futebol, CEP via ViaCEP, etc.).

---

## 👥 Integrantes

- **Felipe Andrade**
- **Guilherme Augusto**
- **Raphael Taketa**
- **Victor Guimarães**

---

## 💻 Tecnologias usadas

- **Frontend**
  - Next.js (React)
  - Tailwind CSS
  - Ferramentas de lint / configuração: ESLint, arquivos de configuração do Next.js
- **Backend**
  - Python (versão 3.x, idealmente ≥ 3.8)
  - Flask (micro-framework web)
  - MongoDB para banco de dados
- **Integrações Externas**
  - API de Futebol para buscar dados de campeonatos, partidas, fases, etc.
  - ViaCEP para buscar endereço a partir de CEP
- **Outras ferramentas e dependências**
  - Sistema de variáveis de ambiente para segredos / tokens
  - Possível uso de virtual environment no Python
  - Gerenciamento de dependências JS (npm)
  - Gerenciamento de requisições HTTP externas no backend
  - Tratamento de CORS se frontend e backend estiverem em domínios diferentes

---

## 📋Pré-requisitos

Antes de começar, verifique se você tem instalado:

- Node.js (versão compatível com Next.js; ex: 16 ou superior)
- npm
- Python 3.x (preferivelmente ≥ 3.8)
- pip para instalar pacotes Python

---

## 📶Instalação e execução

Aqui vai o passo-a-passo para configurar tudo localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/vguima404/Projeto-Passa-a-Bola.git
cd Projeto-Passa-a-Bola

# 2. Configurar o backend (Flask)

cd backend                         # ou onde estiver a pasta do backend
python3 -m venv venv              # criar ambiente virtual
.\venv\Scripts\activate

pip install -r requirements.txt   # instalar dependências Python


# 3. Configurar o frontend (Next.js)

cd ..
npm install

npm run dev                      # inicia frontend em modo de desenvolvimento

python main.py                    # inicia o backend

```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

## 🧍‍♀️ Dashboard da Jogadora (mock via Next API)

O perfil da jogadora (`/PerfilJogadora/[id]`) exibe um Dashboard dinâmico com:

- Estatísticas pessoais (jogos, gols, assistências, posição, nota média)
- Mídia (vídeos enviados e engajamento)
- Competições e peneiras
- Mensagens de olheiros e convites
- Recomendações de times próximos
- Feedback técnico

Para facilitar o desenvolvimento frontend, criamos rotas de API mock no Next.js. Esses endpoints retornam dados de exemplo e podem ser substituídos pela integração real com o backend Flask quando estiver disponível.

Endpoints mock criados (Next.js App Router):

```
GET /api/player/[id]/stats
GET /api/player/[id]/media
GET /api/player/[id]/competitions
GET /api/player/[id]/recommendations
GET /api/player/[id]/feedback
```

Integração futura: troque os fetch do componente `app/components/dashboard/PlayerDashboard.jsx` para chamar o backend Flask (ex.: `http://localhost:5000/...`) e remova/ajuste os endpoints mock conforme necessário.

### Opcional: usar JSON local

Para facilitar testes sem backend, as rotas acima tentam carregar dados de arquivos JSON em `public/data/player/{id}` quando disponíveis. Se o arquivo não existir, elas retornam um mock padrão.

Estrutura esperada:

```
public/
  data/
    player/
      1/
        stats.json
        media.json
        competitions.json
        recommendations.json
        feedback.json
```

Exemplo de `stats.json`:

```
{
  "playerId": "1",
  "matches": 28,
  "goals": 15,
  "assists": 9,
  "position": "Atacante",
  "ratingAvg": 8.4,
  "wins": 18
}
```

Abra `/PerfilJogadora/1` para ver o dashboard consumindo esses arquivos locais. Você pode criar outras pastas por `id` (por exemplo, `2`, `demo`) e acessar `/PerfilJogadora/{id}` correspondente.

## API Endpoints (Documentação)

### Endpoints do Backend Flask (MongoDB)

- **Login usuário:**  
  `POST https://projeto-passa-a-bola.onrender.com/login`

- **Login admin:**  
  `POST https://projeto-passa-a-bola.onrender.com/admin-login`

- **Cadastro de usuário:**  
  `POST https://projeto-passa-a-bola.onrender.com/register`

- **Buscar todos os usuários:**  
  `GET https://projeto-passa-a-bola.onrender.com/users`

- **Buscar usuário por ID:**  
  `GET https://projeto-passa-a-bola.onrender.com/user/<user_id>`

- **Atualizar usuário:**  
  `PUT https://projeto-passa-a-bola.onrender.com/user/<user_id>`

- **Remover usuário:**  
  `DELETE https://projeto-passa-a-bola.onrender.com/user/<user_id>`

- **Atualizar role (jogadora/olheiro):**  
  `PUT https://projeto-passa-a-bola.onrender.com/user/<user_id>/role`

- **Listagem para administração (resumo de usuários):**  
  `GET https://projeto-passa-a-bola.onrender.com/admin/users`

- **Top estatísticas de gols e defesas (ranking):**  
  `GET https://projeto-passa-a-bola.onrender.com/top-stats`

- **Health check:**  
  `GET https://projeto-passa-a-bola.onrender.com/`

---

### Upload de Imagens (Imgbb)

Integração para upload de avatar/foto de perfil usando o serviço [imgbb](https://api.imgbb.com/).

**Endpoint principal:**

- `POST https://projeto-passa-a-bola.onrender.com/upload-image`
  - Content-Type: `multipart/form-data`
  - Campo do formulário: `image` (arquivo)
  - Limite de tamanho: 5 MB
  - Requer variável de ambiente `IMGBB_API_KEY` configurada no backend.
  - Respostas:
    - Sucesso: `{ "success": true, "link": "https://i.ibb.co/..." }`
    - Erro (exemplos): `{ "error": "API key ausente" }`, `{ "error": "Arquivo muito grande (max 5MB)" }`, `{ "error": "Falha no upload", "detail": "..." }`

**Health do upload (útil para validar deploy):**

- `GET https://projeto-passa-a-bola.onrender.com/upload-image`
  - Retorna JSON simples confirmando que a rota está ativa.

**Variáveis de ambiente:**

Backend (`backend/.env`):

```
IMGBB_API_KEY=1daea02eec28d6f39b0c064b89049017
```

Frontend (`.env.local` opcional):

```
NEXT_PUBLIC_API_BASE_URL=https://projeto-passa-a-bola.onrender.com
```

Se não definido em desenvolvimento, o código usa fallback automático para `http://127.0.0.1:5000`.

**Exemplo de requisição (curl):**

```bash
curl -X POST \
  -F "image=@/caminho/para/foto.jpg" \
  https://projeto-passa-a-bola.onrender.com/upload-image
```

**Fluxo no frontend:**

1. Usuário seleciona arquivo.
2. Componente envia `FormData` para `/upload-image`.
3. Backend valida tamanho, lê e converte base64, envia ao imgbb.
4. URL retornada é salva no perfil via `PUT /user/<user_id>` no campo `photoUrl`.

**Principais validações no backend:**

- Presença da chave `IMGBB_API_KEY`.
- Presença do arquivo `image`.
- Tamanho máximo (5MB).
- Tratamento de erros da API externa (status não 200 / payload inválido).

**CORS:**
O backend adiciona cabeçalhos `Access-Control-Allow-Origin` para o domínio do frontend (Vercel) e origens locais (`http://localhost:3000`, etc.), permitindo o upload direto sem bloqueio de navegador.

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
POST    https://projeto-passa-a-bola.onrender.com/login
POST    https://projeto-passa-a-bola.onrender.com/admin-login
POST    https://projeto-passa-a-bola.onrender.com/register
POST    https://projeto-passa-a-bola.onrender.com/upload-image
GET     https://projeto-passa-a-bola.onrender.com/users
GET     https://projeto-passa-a-bola.onrender.com/admin/users
GET     https://projeto-passa-a-bola.onrender.com/user/<user_id>
PUT     https://projeto-passa-a-bola.onrender.com/user/<user_id>
PUT     https://projeto-passa-a-bola.onrender.com/user/<user_id>/role
DELETE  https://projeto-passa-a-bola.onrender.com/user/<user_id>
GET     https://projeto-passa-a-bola.onrender.com/top-stats
GET     https://projeto-passa-a-bola.onrender.com/
GET     https://projeto-passa-a-bola.onrender.com/upload-image

# API Futebol
GET     https://api.api-futebol.com.br/v1/campeonatos/71/partidas
GET     https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases/{fase_id}
GET     https://api.api-futebol.com.br/v1/campeonatos/{campeonato_id}/fases

# ViaCEP
GET     https://viacep.com.br/ws/{cep}/json/
```
