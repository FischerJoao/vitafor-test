# Frontend - Vita Characters

Frontend do case desenvolvido com React, TypeScript, Vite e Bootstrap 5.

Este projeto consome:

- a API pública do Rick and Morty para listar personagens
- o backend próprio do projeto para login, sessão e personagens salvos

## Tecnologias

- React
- TypeScript
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons

## Funcionalidades

- listagem paginada de personagens
- detalhe de personagem vindo da API externa
- login e cadastro com sessão PHP no backend
- persistência de usuário autenticado via Context API
- salvar personagens no banco
- listar personagens salvos
- editar e excluir personagens salvos
- página de currículo/portfólio em `/sobre`

## Estrutura principal

```text
src/
  components/    componentes reutilizáveis
  context/       autenticação global
  pages/         páginas da aplicação
  routes/        definição das rotas
  services/      chamadas HTTP
  styles/        variáveis e estilos globais
  types/         tipagens TypeScript
```

## Pré-requisitos

- Node.js 18+ recomendado
- npm
- backend rodando localmente

## Instalação

```bash
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`.

Exemplo:

```env
VITE_API_URL=http://localhost:8000
VITE_RICK_AND_MORTY_API_URL=https://rickandmortyapi.com/api
```

### O que cada variável faz

- `VITE_API_URL`: URL do backend próprio
- `VITE_RICK_AND_MORTY_API_URL`: URL da API externa do Rick and Morty

## Rodando o projeto

```bash
npm run dev
```

Por padrão, o Vite costuma subir em:

```text
http://localhost:5173
```

Se quiser trocar a porta:

```bash
npm run dev -- --port 3000
```

## Rodando com Docker

Este projeto possui um `Dockerfile` próprio.

### Subir só o frontend

```bash
docker build -t vitafor-frontend .
docker run --rm -p 5173:5173 vitafor-frontend
```

O app ficará disponível em:

```text
http://localhost:5173
```

### Subir junto com o backend

Na pasta raiz `vitafor-test`, existe um `docker-compose.yml`.

Para subir tudo:

```bash
docker compose up --build
```

## O que você precisa para Docker

- Docker
- Docker Compose

## Build

```bash
npm run build
```

## Preview da build

```bash
npm run preview
```

## Rotas da aplicação

- `/` home com listagem paginada
- `/character/:id` detalhe de personagem da API
- `/saved-characters` lista de personagens salvos
- `/saved-characters/:id` detalhe/edição de personagem salvo
- `/login` login e cadastro
- `/sobre` currículo/portfólio

## Como a autenticação funciona

1. o usuário faz login
2. o backend cria `$_SESSION["user_id"]`
3. o navegador mantém o cookie de sessão
4. o frontend chama `/me` ao iniciar
5. o `AuthProvider` restaura o usuário autenticado no estado global

Por isso, as chamadas ao backend usam:

```ts
credentials: "include";
```

## Services principais

### `src/services/api.ts`

Responsável por falar com o backend:

- `Login`
- `Register`
- `Me`
- `Logout`
- `saveCharacter`
- `getSavedCharacters`
- `getSavedCharacterById`
- `updateSavedCharacter`
- `deleteSavedCharacter`

### `src/services/rickAndMorty.ts`

Responsável por falar com a API externa:

- `fetchCharacters`
- `fetchCharacterById`

## Context de autenticação

Arquivos:

- `src/context/AuthContextObject.ts`
- `src/context/authContext.tsx`
- `src/context/useAuth.ts`

Esse contexto centraliza:

- usuário logado
- estado de loading inicial
- login
- cadastro
- logout
- refresh da sessão

## Layout da aplicação

O layout global fica em `src/App.tsx`:

- `NavBar` no topo
- `main` com o conteúdo das rotas
- `Footer` no fim

As páginas renderizam dentro desse layout.

## Observações importantes

- se a porta do backend mudar, atualize `VITE_API_URL`
- existe `Dockerfile` próprio para rodar o frontend isoladamente
- existe `docker-compose.yml` na raiz para rodar frontend e backend juntos
- para usar Docker junto com o backend, prefira subir ambos pela raiz do projeto
