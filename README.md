# Vitafor Case

Repo para unir e facilitar a inicialização do projeto
Projeto dividido em dois apps:

- `front-vita`: frontend em React + TypeScript + Vite
- `backend`: API em PHP puro + SQLite

## O que este projeto faz

- lista personagens da API do Rick and Morty
- mostra detalhe de personagem
- permite cadastro e login com sessão PHP
- salva personagens do usuário autenticado
- lista, edita e exclui personagens salvos

## Estrutura

```text
vitafor-test/
  docker-compose.yml
  front-vita/
  backend/
```

## Pré-requisitos

Para rodar com Docker:

- Docker
- Docker Compose

Para rodar sem Docker:

- Node.js 18+
- npm
- PHP 8+
- PDO SQLite habilitado

## Rodando tudo com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

- frontend em `http://localhost:5173`
- backend em `http://localhost:8000`

Para parar:

```bash
docker compose down
```

## Como a estrutura Docker foi organizada

Cada app possui seu próprio `Dockerfile`:

- `front-vita/Dockerfile`
- `backend/Dockerfile`

E a raiz possui o orquestrador:

- `docker-compose.yml`

## Subindo individualmente com Docker

### Frontend

```bash
cd front-vita
docker build -t vitafor-frontend .
docker run --rm -p 5173:5173 vitafor-frontend
```

### Backend

```bash
cd backend
docker build -t vitafor-backend .
docker run --rm -p 8000:8000 vitafor-backend
```

## Variáveis de ambiente do frontend

O frontend usa:

```env
VITE_API_URL=http://localhost:8000
VITE_RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

- `front-vita/.env.example`

como base para criar o `.env`.

## Observações importantes

- o backend usa SQLite, não precisa de container separado de banco
- o arquivo do banco fica em `backend/database/database.sqlite`
- frontend e backend também podem ser rodados localmente sem Docker
- os READMEs individuais explicam o uso de cada app separadamente

## READMEs individuais

- [Frontend README](./front-vita/README.md)
- [Backend README](./backend/README.md)
