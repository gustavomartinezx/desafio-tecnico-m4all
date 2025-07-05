# 🖨️ Desafio Técnico - Sistema de Gestão de Impressoras

Um sistema de desafio da media4all full-stack para o gerenciamento e monitoramento de impressoras corporativas, desenvolvida com React (Next.js) e Spring Boot.

## 📋 Índice

- [Sobre o Projeto](#🎯-sobre-o-projeto)
- [Principais Funcionalidades](#✨-principais-funcionalidades)
- [Tecnologias Utilizadas](#🛠️-tecnologias-utilizadas)
- [Como Executar Localmente](#🚀-como-executar-localmente)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Configuração](#instalação-e-configuração)
- [Documentação da API](#📚-documentação-da-api)
- [Roadmap](#🗺️-roadmap)

## 🎯 Sobre o Projeto

Este projeto é uma plataforma completa para a gestão de impressoras. Realizado como um desafio técnico full-stack da media4all, o sistema oferece uma interface moderna e reativa para operações de CRUD, monitoramento de status em tempo real e sincronização de dados com uma API externa.

## ✨ Principais Funcionalidades

- ✅ **Gestão de Impressoras:** Cadastro, edição, listagem e exclusão de impressoras.
- ✅ **Monitoramento em Tempo Real:** Acompanhamento do status operacional (Online ou Offline).
- ✅ **Sincronização Automática:** Schedule para tarefa assíncrona de uma API externa de tempo em tempo.
- ✅ **Dashboard Intuitivo:** Painel com métricas gerais e logs de atividades recentes.

## 🛠️ Tecnologias Utilizadas

<details>
<summary>Clique para expandir</summary>

### **Frontend**

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Gerenciamento de Estado de Servidor:** TanStack Query (React Query)
- **Gerenciamento de Formulários:** React Hook Form + Zod para validação
- **Componentes UI:** shadcn/ui
- **Cliente HTTP:** Axios

### **Backend**

- **Framework:** Spring Boot 3
- **Linguagem:** Java 17+
- **Módulos Principais:** Spring Web, Spring Data JPA, Bean Validation
- **Banco de Dados:** MySQL (via Docker)
- **Comunicação HTTP:** RestTemplate / WebClient

### **DevOps & Infraestrutura**

- **Containerização:** Docker & Docker Compose

</details>

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js v18+
- JDK 17+
- Docker e Docker Compose

### Instalação e Configuração

1.  **Clone o repositório:**

    ```sh
    git clone https://github.com/gustavomartinezx/desafio-tecnico-m4all.git
    cd desafio-tecnico-m4all
    ```

2.  **Configure as variáveis de ambiente:**

    - O arquivo `.env` deve estar na raiz do projeto (e não dentro de frontend/ ou backend/).
    - Utilize o arquivo `.env-example` como base para criar o seu `.env`:
      ```sh
      cp .env-example .env
      ```
    - Preencha as variáveis de ambiente no arquivo `.env` conforme o exemplo:
      ```env
      MYSQL_DATABASE=impressora
      MYSQL_USER=gustavo
      MYSQL_PASSWORD=SuaSenhaAqui
      MYSQL_ROOT_PASSWORD=root
      MYSQL_HOST=db
      MYSQL_PORT=3306
      ```

3.  **Inicie os serviços com Docker Compose:**

    - A partir da raiz do projeto, execute:
      ```sh
      docker-compose up --build
      ```
    - O comando irá construir as imagens e iniciar os contêineres do frontend, backend e do banco de dados.

4.  **Acesse a aplicação:**

    - **Frontend:** [http://localhost:3000](http://localhost:3000)
    - **Backend (API):** [http://localhost:8080](http://localhost:8080)

5.  **Login Inicial:**
    - O sistema já possui um usuário padrão para acesso inicial:
      - **Usuário:** admin
      - **Senha:** admin123

## 📚 Documentação da API

<details>
<summary>Endpoints Principais</summary>

| Verbo    | Rota                           | Descrição                                  |
| :------- | :----------------------------- | :----------------------------------------- |
| `POST`   | `/api/auth/login`              | Realiza o login e retorna o token JWT.     |
| `GET`    | `/api/v1/printers`             | Lista impressoras com paginação e filtros. |
| `POST`   | `/api/v1/printers`             | Cria uma nova impressora.                  |
| `GET`    | `/api/v1/printers/{id}`        | Busca uma impressora pelo ID.              |
| `PUT`    | `/api/v1/printers/{id}`        | Atualiza todos os dados da impressora.     |
| `DELETE` | `/api/v1/printers/{id}`        | Realiza a exclusão (lógica ou física).     |
| `GET`    | `/api/v1/printers/{id}/status` | Retorna o status operacional (mock).       |
| `GET`    | `/api/v1/sync/statistics`      | Retorna métricas da última sincronização.  |

</details>

## 🗺️ Roadmap

- [ ] **Autenticação e Autorização:** Implementar controle de acesso com JWT.
- [ ] **Perfis de Usuário:** Adicionado perfis de usuário (ADMIN)
- [ ] **Dashboard :** Gráficos interativos sobre uso e status.
