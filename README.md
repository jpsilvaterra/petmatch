# 🐾 PetMatch

**PetMatch** é uma plataforma que conecta adotantes e doadores de animais de estimação.  
O sistema permite o cadastro de usuários, a gestão de animais disponíveis para adoção e o registro dos processos de adoções e doações.

---

## 📚 Entidades e Relacionamentos

- **Usuário**: Realiza o cadastro de animais ou busca por adoção. Pode ser **doador** ou **adotante**.
- **Animal**: Representa o pet disponível para doação ou adoção.
- **Adoção**: Registra o processo de um usuário adotando um animal.
- **Doação**: Registra o processo de um usuário doando um animal.

**Relacionamentos:**

- Um **usuário** pode cadastrar vários **animais**.
- Um **animal** pode estar associado a um processo de **adoção** ou **doação**.
- Um **usuário** pode realizar várias **adoções** e **doações**.

---

## 🧩 Funcionalidades por Tela

### Usuário

- **Campos de Cadastro:**
  - Nome
  - E-mail
  - Telefone
  - Endereço
  - Tipo de usuário (Adotante / Doador)

- **Campos Obrigatórios:**
  - Nome
  - E-mail
  - Tipo de usuário

- **Validações:**
  - E-mail válido
  - Telefone no formato (XX) XXXXX-XXXX

- **Dados de Listagem:**
  - Nome
  - E-mail
  - Tipo de usuário

- **Campos de Busca:**
  - Nome
  - Tipo de usuário

- **Campos Editáveis:**
  - Nome
  - E-mail
  - Telefone
  - Endereço

- **Fluxos:**
  - **Edição:** Selecionar usuário > Editar campos permitidos > Salvar.
  - **Exclusão:** Selecionar usuário > Clicar em excluir > Confirmar.

---

### Animal

- **Campos de Cadastro:**
  - Nome do animal
  - Espécie
  - Raça
  - Idade
  - Porte
  - Status (Disponível para adoção ou doação)

- **Campos Obrigatórios:**
  - Nome
  - Espécie
  - Status

- **Validações:**
  - Idade deve ser um número válido

- **Dados de Listagem:**
  - Nome
  - Espécie
  - Porte
  - Status

- **Campos de Busca:**
  - Nome do animal
  - Espécie
  - Porte

- **Campos Editáveis:**
  - Todos (Nome, Espécie, Raça, Idade, Porte, Status)

- **Fluxos:**
  - **Edição:** Selecionar animal > Editar campos > Salvar.
  - **Exclusão:** Selecionar animal > Clicar em excluir > Confirmar.

---

### Adoção

- **Campos de Cadastro:**
  - Usuário (Adotante)
  - Animal
  - Data da adoção

- **Campos Obrigatórios:**
  - Usuário
  - Animal

- **Validações:**
  - Um animal só pode ser adotado uma vez (não pode ter múltiplas adoções ativas).

- **Dados de Listagem:**
  - Nome do adotante
  - Nome do animal
  - Data da adoção

- **Campos de Busca:**
  - Nome do adotante
  - Nome do animal

- **Campos Editáveis:**
  - Nenhum campo pode ser alterado após confirmação (opcionalmente, apenas a data).

- **Fluxos:**
  - **Edição:** (Se permitido) Editar a data da adoção.
  - **Exclusão:** Selecionar adoção > Clicar em excluir > Confirmar.

---

### Doação

- **Campos de Cadastro:**
  - Usuário (Doador)
  - Animal
  - Data da doação

- **Campos Obrigatórios:**
  - Usuário
  - Animal

- **Validações:**
  - Um animal doado não pode ser doado novamente.

- **Dados de Listagem:**
  - Nome do doador
  - Nome do animal
  - Data da doação

- **Campos de Busca:**
  - Nome do doador
  - Nome do animal

- **Campos Editáveis:**
  - Nenhum (padrão; opcionalmente apenas a data da doação).

- **Fluxos:**
  - **Edição:** (Se necessário) Editar a data da doação.
  - **Exclusão:** Selecionar doação > Clicar em excluir > Confirmar.

---
