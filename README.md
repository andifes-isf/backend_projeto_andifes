# BackEnd_projeto_andifes

Esse projeto tem como objetivo criar um sistema de gerenciamento para o programa Idioma Sem Fronteira da Rede Andifes. Nesse projeto, precisamos gerenciar usuários de diferentes tipo (alunos, professores, etc.), precisamos gerenciar as turmas e os cursos e as inscrições.

## Tabela de Conteúdos
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Rotas da API](#rotas-da-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contato](#contato)

## Sobre

## Funcionalidades
- Criação de Usuários
  - AlunoIsF   
    - Associados à alguma instituição de ensino
    - Não associados a instituição de ensino
  - ProfessorIsF
    - Cursista de especialização
    - Aluno da graduação 
- Inscrição em turmas
  - AlunoIsF associados à instituições de ensino credenciadas, ou que algum professor da sua IES esteja ministrando alguma turma na oferta, possuem direito de se inscrever em qualquer curso da oferta
  - AlunoIsF estrangeiros podem se inscrever em cursos de português, independentemente de estarem associados a alguma IES ou não   

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
   yarn sequelize db:migrate
   ```
7. Inicie o servidor
   ```bash
   yarn dev
   ```

## Rotas da API
### Usuário
- **GET /usuario**: Lista todos os usuários
#### AlunoIsF
- **GET /aluno_isf**: Lista todos os AlunoIsF
##### AlunoDeInstituicao
- **POST /aluno_deinstituicao**: Cria um novo AlunoDeInstituicao
- **GET /aluno_deinstituicao**: Lista todos os AlunoDeInstituicao
#### ProfessorIsF
- **POST /professor_isf**: Cria um novo ProfessorIsF
- **GET /professor_isf**: Lista todos os ProfessorIsF
### Instituição de Ensino
- **POST /instituicao_ensino**: Cria um novo ProfessorIsF
- **POST /comprovante_aluno_instituicao**: Cria uma associação entre um aluno e uma instituição de ensino
- **GET /instituicao_ensino**: Lista todos os ProfessorIsF
### Curso
- **POST /curso**: Cria um novo Curso
- **GET /curso**: Lista todos os Curso

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
