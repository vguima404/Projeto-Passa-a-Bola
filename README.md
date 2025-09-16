# Projeto Passa a Bola ⚽

Projeto web full-stack para gerenciar usuários, estatísticas, RG, destaques (MVP), com frontend em Next.js + backend em Flask + banco de dados MongoDB + integrações externas (API de futebol, CEP via ViaCEP, etc.).

---

## Tecnologias usadas

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

## Pré-requisitos

Antes de começar, verifique se você tem instalado:

- Node.js (versão compatível com Next.js; ex: 16 ou superior)
- npm
- Python 3.x (preferivelmente ≥ 3.8)
- pip para instalar pacotes Python

---

## Instalação e execução

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

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o  resultado.

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
