# CRUD API de Tarefas

API simples para gerenciamento de tarefas, construída com Fastify e TypeScript, feita para o projeto CRUD de Tarefas da Rocketseat.

## Tecnologias usadas
- Node.js
- Fastify
- TypeScript
- @fastify/multipart (upload de arquivos)

## Funcionalidades
- Criar tarefas
- Listar tarefas
- Atualizar tarefa por ID
- Excluir tarefa por ID
- Alternar status de conclusão por ID
- Importar tarefas via arquivo (multipart)

## Como executar
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor em desenvolvimento:
   ```sh
   npm run dev
   ```

## Rotas principais
- POST `/create` — cria uma tarefa
- GET `/get` — lista tarefas
- PUT `/update/:id` — atualiza uma tarefa
- DELETE `/delete/:id` — exclui uma tarefa
- PATCH `/patch/:id` — alterna o status de conclusão
- POST `/import-tasks` — importa tarefas via upload de arquivo

## Estrutura
- `src/app.ts` — inicializa o Fastify e registra plugins/rotas
- `src/routes/routes.ts` — define as rotas da API
