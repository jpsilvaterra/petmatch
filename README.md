# petmatch
O PetMatch é uma plataforma que conecta adotantes e doadores de animais de estimação.
O sistema permitirá o cadastro de usuários, a gestão de animais disponíveis para adoção, além de registros de processos de adoções e doações.

Explicação da escolha das entidades e como se relacionam:
	•	Usuário: é quem realiza cadastros de animais ou busca para adoção. Pode ser doador ou adotante.
	•	Animal: representa o pet que pode ser doado ou adotado.
	•	Adoção: registra o processo de um usuário adotando um animal.
	•	Doação: registra o processo de um usuário doando um animal.

As entidades se relacionam da seguinte forma:
	•	Um Usuário pode cadastrar vários Animais.
	•	Um Animal pode estar associado a um processo de Adoção ou Doação.
	•	Um Usuário pode realizar várias Adoções ou Doações.

⸻

Explicações de Cada Tela

Usuário
	•	Campos de cadastro:
	•	Nome
	•	E-mail
	•	Telefone
	•	Endereço
	•	Tipo de usuário (Adotante/Doador)
	•	Campos obrigatórios:
	•	Nome
	•	E-mail
	•	Tipo de usuário
	•	Validações:
	•	E-mail válido
	•	Telefone (formato válido, ex: (XX) XXXXX-XXXX)
	•	Dados de listagem:
	•	Nome
	•	E-mail
	•	Tipo de usuário
	•	Campos de busca:
	•	Nome
	•	Tipo de usuário
	•	Quais campos serão editáveis:
	•	Nome
	•	E-mail
	•	Telefone
	•	Endereço
	•	Fluxo de edição:
	•	Usuário seleciona o usuário na lista > Clica em editar > Altera os campos permitidos > Salva.
	•	Fluxo de exclusão:
	•	Usuário seleciona o usuário na lista > Clica em excluir > Confirma exclusão.

⸻

Animal
	•	Campos de cadastro:
	•	Nome do animal
	•	Espécie
	•	Raça
	•	Idade
	•	Porte
	•	Status (Disponível para adoção ou doação)
	•	Campos obrigatórios:
	•	Nome
	•	Espécie
	•	Status
	•	Validações:
	•	Idade deve ser um número válido
	•	Dados de listagem:
	•	Nome
	•	Espécie
	•	Porte
	•	Status
	•	Campos de busca:
	•	Nome do animal
	•	Espécie
	•	Porte
	•	Quais campos serão editáveis:
	•	Todos (Nome, Espécie, Raça, Idade, Porte, Status)
	•	Fluxo de edição:
	•	Usuário seleciona o animal na lista > Clica em editar > Altera campos > Salva.
	•	Fluxo de exclusão:
	•	Usuário seleciona o animal na lista > Clica em excluir > Confirma exclusão.

⸻

Adoção
	•	Campos de cadastro:
	•	Usuário (Adotante)
	•	Animal
	•	Data da adoção
	•	Campos obrigatórios:
	•	Usuário
	•	Animal
	•	Validações:
	•	Um animal só pode ser adotado uma vez (não pode ter duas adoções ativas para o mesmo animal).
	•	Dados de listagem:
	•	Nome do adotante
	•	Nome do animal
	•	Data da adoção
	•	Campos de busca:
	•	Nome do adotante
	•	Nome do animal
	•	Quais campos serão editáveis:
	•	Nenhum campo pode ser alterado após a adoção confirmada (opcional: editar apenas a data).
	•	Fluxo de edição:
	•	Se permitido, usuário edita a data da adoção.
	•	Fluxo de exclusão:
	•	Usuário seleciona a adoção na lista > Clica em excluir > Confirma exclusão.

⸻

Doação
	•	Campos de cadastro:
	•	Usuário (Doador)
	•	Animal
	•	Data da doação
	•	Campos obrigatórios:
	•	Usuário
	•	Animal
	•	Validações:
	•	Um animal doado não pode ser doado novamente.
	•	Dados de listagem:
	•	Nome do doador
	•	Nome do animal
	•	Data da doação
	•	Campos de busca:
	•	Nome do doador
	•	Nome do animal
	•	Quais campos serão editáveis:
	•	Nenhum campo (padrão).
	•	Fluxo de edição:
	•	Caso necessário, apenas editar a data da doação.
	•	Fluxo de exclusão:
	•	Usuário seleciona a doação na lista > Clica em excluir > Confirma exclusão
