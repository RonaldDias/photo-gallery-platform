# photo-gallery-platform

Plataforma web responsiva para gerenciamento de álbuns e fotos com autenticação, upload de imagens e visualização em múltiplos formatos.

## Tecnologias

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Hook Form + Zod
- React Dropzone
- React Hot Toast
- Axios

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- Multer
- Sharp
- exif-parser

### DevOps

- Docker
- Docker Compose
- PostgreSQL containerizado

## Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- Git

## Como Rodar com Docker

1. Clone o repositório:

```bash
git clone
cd photo-gallery-platform
```

2. Configure as variáveis de ambiente:

```bash
cp backend/.env
```

3. Inicie os containers:

```bash
docker compose up
```

4. Em outro terminal, rode as migrations:

```bash
docker compose exec backend npx prisma migrate dev
```

5. Acesse:

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Postgres: localhost:5432

## Parar os containers

```bash
docker-compose down
```

## Limpar tudo (cuidado: apaga o banco)

```bash
docker-compose down -v
```

## Como Rodar sem Docker

### Backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o .env com suas credenciais do Postgres

4. Execute as migrations:

```bash
npx prisma migrate dev
```

5. Inicie o servidor:

```bash
npm run dev
```

### Frontend

1. Entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Estrutura do Projeto

```
photo-gallery-platform/
├── frontend/          # Aplicação React
├── backend/           # API Node.js
├── docker-compose.yml
└── README.md
```

## Variáveis de Ambiente

Consulte o arquivo `backend/.env.example` para ver todas as variáveis necessárias.

## Decisões Técnicas

### Por que Prisma ORM?

- Type-safety com TypeScript
- Migrations automatizadas
- Query builder intuitivo
- Proteção contra SQL injection

### Por que Tailwind CSS?

- Desenvolvimento rápido
- Responsividade facilitada
- Design system consistente
- Bundle otimizado

### Arquitetura em Camadas

- **Routes**: Definição de endpoints HTTP
- **Controllers**: Validação e manipulação de requisições
- **Services**: Lógica de negócio
- **Database**: Acesso aos dados via Prisma

## Funcionalidades

- Autenticação com JWT
- CRUD de álbuns
- Upload de fotos com drag & drop
- Detecção automática de cor predominante
- Extração de metadados EXIF
- Visualização em grid e tabela
- Responsivo para mobile e desktop

### Endpoints da API

### Autenticação

```
POST   /api/auth/cadastro      - Criar conta
POST   /api/auth/login         - Fazer login
```

### Álbuns

```
GET    /api/albuns             - Listar álbuns do usuário
POST   /api/albuns             - Criar álbum
GET    /api/albuns/:id         - Detalhes do álbum
PUT    /api/albuns/:id         - Editar álbum
DELETE /api/albuns/:id         - Deletar álbum
```

### Fotos

```
POST   /api/albuns/:albumId/fotos  - Upload de fotos
GET    /api/albuns/:albumId/fotos  - Listar fotos do álbum
DELETE /api/fotos/:id               - Deletar foto

Todas as rotas (exceto auth) requerem header:
Authorization: Bearer <token>
```

### Testando a Aplicação

### 1. Criar conta
- Acesse http://localhost:5173/cadastro
- Preencha: nome, email, senha
- Clique em "Criar Conta"

### 2. Criar álbum
- Na página de álbuns, clique em "Novo Álbum"
- Preencha título e descrição
- Salve

### 3. Upload de fotos
- Entre no álbum criado
- Arraste fotos para a área de upload
- Clique em "Enviar Fotos"
- Veja as cores predominantes e datas extraídas!

### 4. Visualizações
- Alterne entre Grid e Tabela
- Na tabela, veja as cores e datas formatadas

### 5. Delete
- Tente deletar um álbum com fotos → erro esperado
- Delete fotos individuais
- Delete o álbum vazio

## Licença

MIT
```

