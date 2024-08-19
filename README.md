# BackEnd_projeto_andifes

Esse projeto tem como objetivo criar um sistema de gerenciamento para o programa Idioma Sem Fronteira da Rede Andifes. Nesse projeto, precisamos gerenciar usuários de diferentes tipo (alunos, professores, etc.), precisamos gerenciar as turmas e os cursos e as inscrições.

## Tabela de Conteúdos
- [Instalação](#instalação)
- [Rotas da API](#rotas-da-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contato](#contato)

## Instalação
- Node.Js (20.15.0)
- yarn
- MySQL

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/Arata2703/backend_projeto_andifes
   ```
2. Navegue até o diretório do projeto
3. Instale as dependências:
   ```bash
   yarn add nodemon sucrase prettier -D
   yarn add bcrypt express mysql2 sequelize sequelize-cli yup
   ```
4. Configure as variáveis de ambiente
   - Crie um arquivo '.env' com as seguintes informações
   - DB_USERNAME
   - DB_PASSWORD
   - DB_HOST
   - DB_DATABASE
   - DB_DIALECT
5. Crie a database no seu computador
   ```bash
   yarn sequelize db:create
   ```
6. Execute as migrações do banco de dados
   ```bash
   yarn migrate
   ```
7. Alimente o banco de dados
   ```bash
   yarn seed
   ```
8. Inicie o servidor
   ```bash
   yarn dev
   ```

## Rotas da API
### Usuário
- **GET /usuario**: Lista todos os usuários
- **GET /usuario/meus_dados**: Retorna os dados do usuário logado
#### AlunoIsF
- **GET /aluno_isf**: Lista todos os AlunoIsF
- **POST /alunoisf_participa_turmaoc**: Insere um aluno isf em uma turma. Para poder aderir a turma, o aluno precisa que o nível de sua proeficiência naquele idioma seja no máximo um nível acima do seu (Se o aluno é do nível B1, ele pode cursar o B2, mas não o C1)
- **POST /proeficiência_alunoisf**: Insere um nível de idioma para o aluno isf
##### AlunoDeInstituicao
- **POST /aluno_estrangeiro**: Cria um novo AlunoEstrangeiro
- **GET /aluno_estrangeiro**: Lista todos os AlunoEstrangeiro
- **POST /comprovante_aluno_instituicao**: Relaciona o aluno isf com uma instituição de ensino
##### AlunoEstrangeiro
- **POST /aluno_deinstituicao**: Cria um novo AlunoDeInstituicao
- **GET /aluno_deinstituicao**: Lista todos os AlunoDeInstituicao
#### ProfessorIsF
- **GET /professor_isf**: Lista todos os ProfessorIsF
- **POST /comprovante_professor_instituicao**: Relaciona o professor com uma instituição de ensino
- **POST /proeficiencia_professorisf**: Insere um nível de idioma para o professor isf
- **POST /professorisf_ministra_turmaoc**: Insere o professor logado para ministrar uma turma. Para poder ministrar uma turma, o professor precisa que o nível de sua proeficiência naquele idioma seja igual ou superior ao do curso (se o professor é do nível C1, ele pode inistrar uma turma de nível C1, mas não uma de nível C2)
- **GET /professorisf_ministra_turmaoc**: Lista todos os relacionamentos do professor logado
##### CursistaEspecialização
- **POST /cursista_especialização**: Cria um novo CursistaEspecialização
- **GET /cursista_especialização**: Lista todos os CursistaEspecialização
### Instituição de Ensino
- **POST /instituicao_ensino**: Cria um novo ProfessorIsF
- **GET /instituicao_ensino**: Lista todos os ProfessorIsF
#### Instituição de Ensino Brasileira
- **POST /instituicao_ensino_estrangeira**: Cria uma nova InstituicaoEnsinoBrasileira
- **GET /instituicao_ensino_brasileira**: Lista todas as InstituicaoEnsinoBrasileira
#### Instituição de Ensino Estrangeira
- **POST /instituicao_ensino_estrangeira**: Cria uma nova InstituicaoEnsinoEstrangeira
- **GET /instituicao_ensino_estrangeira**: Lista todas as InstituicaoEnsinoEstrangeira
### Curso
- **POST /curso**: Cria um novo Curso
- **GET /curso**: Lista todos os Curso
#### Turmas da Oferta Coletiva
- **Post /turma_oc**: Cria uma nova turma da oferta coletiva
- **Get /turma_oc**: lista todas as turmas da oferta coletiva
### Autentiação
- **POST /login**: Autentica um usuário

## Tecnologias Utilizadas
- Node.Js
- Express
- Sequelize
- MySQL
- bcrypt
- jsonwebtoken

## Contato

Rafael Naoki Arakaki Uyeta
[Linkedin](https://www.linkedin.com/in/rafaeluyeta/)
arata.uyeta@gmail.com

Link para o projeto: [https://github.com/Arata2703/backend_projeto_andifes](https://github.com/Arata2703/backend_projeto_andifes)
