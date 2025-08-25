# NodeAulas

API para gerenciamento de cursos utilizando Fastify, Drizzle ORM e PostgreSQL.

## Funcionalidades

- Criar cursos
- Listar todos os cursos
- Buscar curso por ID
- Documentação automática via Swagger e Scalar API Reference

## Tecnologias Utilizadas

- [Fastify](https://www.fastify.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [Swagger](https://swagger.io/)
- [Scalar API Reference](https://github.com/scalar/scalar)

## Como executar

1. **Clone o repositório**
2. **Instale as dependências**
   ```sh
   npm install
   ```
3. **Configure o banco de dados**
   - Edite o arquivo `.env` com sua URL do PostgreSQL.
   - Inicie o banco de dados com Docker:
     ```sh
     docker-compose up -d
     ```
4. **Execute as migrações**
   ```sh
   npm run db:migrate
   ```
5. **Inicie o servidor**
   ```sh
   npm run dev
   ```

## Endpoints

- `POST /courses` — Cria um novo curso
- `GET /courses` — Lista todos os cursos
- `GET /courses/:id` — Busca curso pelo ID

## Documentação

Acesse a documentação interativa em [http://localhost:3333/docs](http://localhost:3333/docs) quando o servidor estiver rodando em modo desenvolvimento.

## Estrutura do Projeto

```
.env
docker-compose.yml
server.ts
src/
  database/
    client.ts
    schema.ts
  routes/
    create-course.ts
    get-course-by-id.ts
    get-courses.ts
drizzle/
  *.sql
  meta/
    *.json
```

## Licença

Este projeto está sob licença
