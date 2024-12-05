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
##### CursistaEspecialização
- **POST /specialization_student**: Cria um novo CursistaEspecialização
- **GET /specialization_student**: Lista todos os CursistaEspecialização
- **POST /specialization_student/practical_report**: Adiciona um novo relatório prático para o cursista 
- **GET /specialization_student/my_practical_report**: Lista todos relatórios práticos do cursista 
- **GET /specialization_student/practical_report_not_viewed**: Lista todos relatórios práticos do cursista não visualizados após análise do orientador 
- **GET /specialization_student/practical_report/:name**: Retorna o relatório prático, de nome "name", do cursista 
- **POST /specialization_student/class/:name**: Adiciona o cursista na turma de nome "name"
- **GET /specialization_student/my_classes**: Lista todas as turmas que o cursista faz parte
- **POST /specialization_student/interes_in_discipline**: Insere na lista de interesse as disciplinas que o cursista está interessado
- **POST /specialization_student/feedback**: Adiciona um feedback
##### ProfessorIsF
- **GET /isf_teacher**: Lista todos os professores IsF
- **POST /isf_teacher/proeficiency**: Adiciona uma nova proeficiência para o professor
- **GET /isf_teacher/proeficiency**: Lista todas as proeficiências de um professor
- **POST /isf_teacher/institution/:institutionId**: Relaciona o professor IsF com uma nova instituição. Se o relacionamento já existe, retorna erro
- **GET /isf_teacher/my_institutions**: Lista todas as instituições daquele professor IsF
- **GET /isf_teacher/current_institution**: Lista a instituição atual do professor IsF
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
