# 🐾 PetMatch API

Aplicação desenvolvida com Node.js e TypeScript para facilitar o processo de adoção de animais, conectando usuários interessados com ONGs e protetores independentes. Ideal para projetos sociais, acadêmicos ou ONGs de proteção animal.

## 🎯 Objetivo

Fornecer uma API RESTful escalável e segura para cadastro e gerenciamento de animais disponíveis para adoção, incluindo perfis de ONGs, protetores e adotantes. O sistema também registra e organiza informações sobre os pets, usuários e adoções.

## 🚧 Projeto ainda em desenvolvimento... 🚧
---

## ⚙️ Funcionalidades

- ✅ **Cadastro e Gerenciamento de Animais**
  - Cadastro de pets com informações como nome, espécie, porte e histórico
  - Atualização e remoção de animais disponíveis para adoção

- 👥 **Cadastro de Usuários e ONGs**
  - Usuários podem se cadastrar como protetores, ONGs ou adotantes
  - Gerenciamento de perfis via API

- 📦 **Adoções e Histórico**
  - Registro de adoções com vínculo entre usuário e animal
  - Visualização de histórico e status da adoção

- 🧱 **Persistência com Prisma ORM**
  - Integração com banco de dados relacional (PostgreSQL)
  - Migrações e modelos de dados com Prisma

- 🌐 **Documentação e Diagramas**
  - Diagrama de classes e modelo de banco em formato `.drawio`
  - Organização modular por pastas

---

## 🧪 Tecnologias Utilizadas

- Node.js — Ambiente de execução JavaScript server-side  
- TypeScript — Superset de JavaScript com tipagem estática  
- Express.js — Framework leve para construção de APIs  
- Prisma ORM — ORM moderno para bancos relacionais  
- dotenv — Configuração de variáveis de ambiente  
- PostgreSQL — Banco de dados relacional  
- Draw.io — Diagramas de entidade-relacionamento e classes  

---

## 🚀 Como rodar o projeto

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/petmatch.git
   cd petmatch
2. **Configure as variáveis de ambiente**
   - Renomeie .env.example para .env e preencha com suas configurações
3. **Instale as dependências**
   ```bash
   npm install
4. **Execute as migrações**
   ```bash
   npx prisma migrate dev
5. **Inicie o servidor**
   ```bash
   npm run dev
---
## 🖼️ Diagramas

- **diagrama de classes.drawio**
  - Relacionamento entre entidades do sistema

- **PetMatch_bd.drawio**
  - Modelo relacional do banco de dados
