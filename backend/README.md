# Backend - Vita Characters API

- cadastro de usuários
- login e logout
- identificação do usuário autenticado
- CRUD de personagens salvos

## Tecnologias

- PHP
- SQLite
- PDO
- Session API do PHP

## Arquitetura

O backend segue uma separação simples em camadas:

```text
public/
  index.php                ponto de entrada HTTP

src/
  Controllers/             request e response
  Services/                regras de negócio
  Repositories/            acesso ao banco
  Database.php             conexão SQLite

database/
  database.sqlite          banco local
```

## Padrão usado

- `Controller`: lê request e devolve JSON
- `Service`: aplica regras de negócio
- `Repository`: executa SQL no banco

## Pré-requisitos

- PHP 8+ recomendado
- extensão PDO SQLite habilitada

## Como rodar

Entre na pasta `backend` e execute:

```bash
php -S localhost:8000 -t public
```

O projeto ficará disponível em:

```text
http://localhost:8000
```

Se quiser trocar a porta:

```bash
php -S localhost:8001 -t public
```

## Rodando com Docker

Este projeto possui um `Dockerfile` próprio.

### Subir só o backend

```bash
docker build -t vitafor-backend .
docker run --rm -p 8000:8000 vitafor-backend
```

API disponível em:

```text
http://localhost:8000
```

### Subir junto com o frontend

Na raiz `vitafor-test`, existe um `docker-compose.yml`.

Para subir tudo:

```bash
docker compose up --build
```

## O que você precisa para Docker

- Docker
- Docker Compose

## Banco de dados

O projeto usa SQLite.

Arquivo do banco:

```text
database/database.sqlite
```

A conexão é criada em:

- `src/Database.php`

O arquivo e as tabelas são criadas automaticamente quando a conexão é inicializada.

### Tabelas

#### `users`

- `id`
- `name`
- `email`
- `password`
- `created_at`
- `updated_at`

#### `characters`

- `id`
- `user_id`
- `name`
- `species`
- `image`
- `url`
- `created_at`
- `updated_at`

## CORS

O backend está preparado para aceitar requisições locais de desenvolvimento vindas de:

- `localhost`
- `127.0.0.1`

em diferentes portas.

Isso facilita rodar o frontend em:

- `5173`
- `5174`
- `3000`

## Sessão e autenticação

Sessão PHP.

Fluxo:

1. o usuário faz login
2. o backend valida email e senha
3. o backend grava `$_SESSION["user_id"]`
4. o navegador mantém o cookie da sessão
5. o frontend chama `/me` para restaurar o usuário autenticado

## Rotas disponíveis

### Auth

- `POST /register`
- `POST /login`
- `GET /me`
- `POST /logout`

### Characters

- `GET /characters`
- `POST /characters`
- `GET /characters/:id`
- `PUT /characters/:id`
- `DELETE /characters/:id`

### Verificar api ativa

- `GET /`

## Exemplos de payload

### `POST /register`

```json
{
  "name": "Joao",
  "email": "joao@email.com",
  "password": "teste123"
}
```

### `POST /login`

```json
{
  "email": "joao@email.com",
  "password": "teste123"
}
```

### `POST /characters`

```json
{
  "name": "Rick Sanchez",
  "species": "Human",
  "image": "https://...",
  "url": "https://rickandmortyapi.com/api/character/1"
}
```

## Fluxo interno de uma request

Exemplo: `POST /characters`

1. a request entra por `public/index.php`
2. a rota é identificada manualmente
3. `CharacterController->create()` é chamado
4. o controller lê o JSON
5. o service valida autenticação e duplicidade
6. o repository executa o `INSERT`
7. o controller responde em JSON

## Controllers

- `src/Controllers/AuthController.php`
- `src/Controllers/CharacterController.php`

Responsabilidades:

- ler `php://input`
- extrair dados
- definir status HTTP
- responder JSON

## Services

- `src/Services/AuthService.php`
- `src/Services/CharacterService.php`

Responsabilidades:

- autenticação
- hash e verificação de senha
- leitura da sessão
- validação de ownership
- regras de negócio do CRUD

## Repositories

- `src/Repositories/UserRepository.php`
- `src/Repositories/CharacterRepository.php`

Responsabilidades:

- `INSERT`
- `SELECT`
- `UPDATE`
- `DELETE`

Sempre usando `prepare` e `execute` (prevenção de SQL injection).

## Requests de teste

Existe uma pasta `reqs/` com exemplos de chamadas HTTP para teste manual.

### Como usar o `req.http`

Você pode usar esse arquivo em editores/extensões que suportam requests HTTP, como:

- VS Code com a extensão `REST Client`
- Postman

### Ordem recomendada de teste

1. `GET /`
2. `POST /register`
3. `POST /login`
4. `GET /me`
5. `POST /characters`
6. `GET /characters`
7. `GET /characters/{id}`
8. `PUT /characters/{id}`
9. `DELETE /characters/{id}`
10. `POST /logout`
11. `GET /me`

## Observações importantes

- o banco está limpo
- autenticação por sessão exige que o frontend envie `credentials: "include"`
- o arquivo `database/database.sqlite` é criado automaticamente se não existir
- as tabelas também são criadas automaticamente na inicialização da conexão
- existe `Dockerfile` próprio para rodar o backend isoladamente
- existe `docker-compose.yml` na raiz para rodar frontend e backend juntos
