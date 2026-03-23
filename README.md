# 🎓 School API — Versão B (NestJS + TypeORM + Docker)

API completa para gerenciamento de **Cursos**, **Estudantes** e **Matrículas**, construída com **NestJS**, **TypeORM**, **PostgreSQL**, **Swagger**, **Testes Unitários**, **Testes E2E** e **Coverage Report**.

A Versão B segue uma arquitetura modular, escalável e totalmente preparada para produção.

---

# 📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação](#instalação)
- [Executando com Docker](#executando-com-docker)
- [Executando sem Docker](#executando-sem-docker)
- [Módulos da Aplicação](#módulos-da-aplicação)
- [Testes Unitários](#testes-unitários)
- [Testes E2E](#testes-e2e)
- [Coverage Report](#coverage-report)
- [Swagger](#swagger)
- [Scripts Disponíveis](#scripts-disponíveis)

---

# 📘 Sobre o Projeto

A **School API** permite:

- Criar, listar, atualizar e remover **Cursos**
- Criar, listar, atualizar e remover **Estudantes**
- Criar e remover **Matrículas**
- Evitar matrículas duplicadas
- Validar entidades relacionadas
- Documentação automática com Swagger
- Testes completos (unitários + E2E)
- Coverage report

---

# 🛠 Tecnologias

- **NestJS**
- **TypeORM**
- **PostgreSQL**
- **Swagger (OpenAPI)**
- **Jest**
- **Supertest**
- **Docker + Docker Compose**
- **Class-validator / Class-transformer**

---

# 🏗 Arquitetura

A aplicação segue o padrão:

- **Modules**
- **Controllers**
- **Services**
- **Repositories**
- **DTOs**
- **Entities**
- **Tests (unit + e2e)**

Cada módulo é totalmente isolado e independente.

---

# 📁 Estrutura de Pastas

```txt
src/
  app.module.ts
  main.ts

  courses/
    course.entity.ts
    course.repository.ts
    courses.service.ts
    courses.controller.ts
    courses.module.ts
    dto/
      create-course.dto.ts
      update-course.dto.ts
    tests/
      courses.service.spec.ts
      courses.controller.spec.ts

  students/
    student.entity.ts
    student.repository.ts
    students.service.ts
    students.controller.ts
    students.module.ts
    dto/
      create-student.dto.ts
      update-student.dto.ts
    tests/
      students.service.spec.ts
      students.controller.spec.ts

  enrollments/
    enrollment.entity.ts
    enrollment.repository.ts
    enrollments.service.ts
    enrollments.controller.ts
    enrollments.module.ts
    dto/
      create-enrollment.dto.ts
      update-enrollment.dto.ts
    tests/
      enrollments.service.spec.ts
      enrollments.controller.spec.ts

test/
  courses.e2e-spec.ts
  students.e2e-spec.ts
  enrollments.e2e-spec.ts

docker-compose.yml
Dockerfile
jest.config.js

🐳 Executando com Docker
## Subir tudo:
bash
docker-compose up -d --build
## Parar:
bash
docker-compose down
## Acessar serviços:
Serviço	URL
API	[http://localhost:3000](http://localhost:3000)
Swagger	[http://localhost:3000/api/docs](http://localhost:3000/api/docs)
Banco	localhost:5432

▶️ Executando sem Docker
## Instalar dependências:
bash
npm install
## Rodar migrations:
bash
npm run typeorm:migrate
## Rodar aplicação:
bash
npm run start:dev
📦 Módulos da Aplicação
📘 Courses
CRUD completo

DTOs com validação

Repository customizado

Testes unitários + E2E

👤 Students
CRUD completo

Validação de e-mail duplicado

Testes unitários + E2E

🎓 Enrollments
Criar matrícula

Evitar matrícula duplicada

Validação de student e course

Testes unitários + E2E

🧪 Testes Unitários
## Rodar:

bash
npm run test
## Testes implementados:

Services (Courses, Students, Enrollments)

Controllers (Courses, Students, Enrollments)

🚀 Testes E2E
## Rodar:

bash
npm run test:e2e
## Testes E2E cobrem:

CRUD de Courses

CRUD de Students

Matrículas (create, list, get, delete)

📊 Coverage Report
## Gerar relatório:

bash
npm run test:cov
## Abrir relatório HTML:

Código
coverage/lcov-report/index.html
📘 Swagger
## A documentação está disponível em:

Código
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)
## Inclui:

Schemas

DTOs

Rotas

Exemplos

Responses

📜 Scripts Disponíveis
json
{
"start": "nest start",
"start:dev": "nest start --watch",
"test": "jest",
"test:watch": "jest --watch",
"test:cov": "jest --coverage",
"test:e2e": "jest --config ./test/jest-e2e.json",
"build": "nest build"
}