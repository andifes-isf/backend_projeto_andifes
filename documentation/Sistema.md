# Descrição do Sistema

O sistema tem como objetivo fazer o gerenciamento do Curso de Especialização do ProgramaIsF

# Funcionalidades Implementadas
Cada endpoint está documentado no próprio Controller

## Usuários
Temos a criação de um usuário base, o qual possui métodos que serão utilizados por todos
1. postUser - Insere um usuário novo no sistema (função auxiliar)
2. get - Retorna todos os usuários do sistema
3. getMyData
4. getNotificacoes
5. getNotificacoesNaoLidas
6. getNotificacao - Retorna a notificação que possui o id passado

### Professor IsF

O professor isf pode ser de dois tipos: CursistaEspecialização ou AlunoGraduação
Também possui algumas funcionalidades próprias que são gerais de todos os professores isf

1. postIsFTeacher - Insere um novo professor isf no sistema (função auxiliar)
2. get - Retorna todos os professores isf do sistema
3. postProeficiência - Todo professor isf possui proeficiência em algum idioma
4. getMinhaProeficiencia - Retorna todas as proeficiencias do professor isf logado
5. postInstituicao - Relaciona o professor isf com alguma instituição
6. getMinhasInstituicoes - Retorna todas as instituições que o profes sor isf logado já fez parte (pessoas podem mudar de instituição, então é necessário armazenar essa movimentação)
7. getInstituicaoAtual - Retorna a instituição atual do professor isf

#### Cursista de Especialização
É o personagem principal da aplicação

1. post - utiliza o postIsFTeacher e o postUser para inserir um novo cursista 
2. get
3. postPracticalReport - Adiciona um relatório prático (relatório que documenta as horas práticas realizadas pelo cursista em questão)
4. getMyMaterial - Retorna os materias produzidos pelo cursista
5. getNotViewedMaterial - Retorna os materiais que já foram avaliados pelo orientador, mas ainda não foram visualizados pelo cursista
6. getMaterial - Retorna um material específico
7. postCursaTurma - Insere o cursista em uma turma de alguma disciplina
8. getMinhasTurmas - Retorna as turmas que o cursista faz parte
9. postInteresseNaDiscipline - Antes da inscrição nas disciplinas, é liberado uma pesquisa no qual os cursista demonstram interesses nas disciplnias para então ser estudado quais disciplinas podem ser ministradas e estudar quem ministraria elas 
10. postReclamation - Adiciona uma reclamação (ouvidoria)
11. postGuidanceReport - Insere o relatório de orientação
12. getGuidanceReport - Retorna os relatório de orientação

#### Aluno de Graduação
Também é um professor isf, mas é um usuário que só faz sentido quando analisamos o Programa IsF em conjunto com o curso de idiomas também. 

### Docente Orientador
É o orientador do cursista

1. post
2. get
3. postOrientado - Vincula o cursista com o orientador logado
4. deleteOrientado - Desvincula o cursista com o orientador logado
5. getMenteesMaterials - Retorna os materiais publicados pelo orientando
6. getNotEvaluatedMaterials - Retorna os materiais que ainda não foram avaliados pelo orientador
7. getNotValidatedMaterials - Retorna os materiais que foram rejeitados
8. putEvaluateMaterial - Avalia um material do cursista
9. postGuidanceReport - Adiciona um relatório de orientação (é o mesmo do cursista)
10. getGuidanceReport - Retorna os relatórios de orientação do orientador


# Funcionalidade que ainda precisam ser implementadas
1. No relatório de orientação
- O relatório de orientação precisa ser preenchido tanto pelo Cursista quanto pelo Orientador
- Eles podem preencher semanalmente, quinzenalmente ou mensalmente
- É preciso armazenar essa "frequência de preenchimento" e cobrar o outro lado
- Por exemplo: Se o cursista preenche semanalmente, é preciso que o orientador também preencha semanalmente

2. Terminar de ajustar a arquitetura do projeto
- Para melhorar a organização arquitetural do projeto, está sendo implementado uma arquitetura semelhante à de Clean Architecture
- Porém, ainda não são todas as classes que seguem esse padrão
- Descrição da arquitetura se encontra em link

3. Ver o que precisa para colocar o sistema em produção

4. Melhorar a inserção de novos usuários
- Não é possível inserir diretamente um novo usuário
- Essa inserção deve ser feita pelos filhos (CursistaEspecialização, DocenteOrientador, etc)
- Contudo, atualmente o caso de uso está utilizando diretamente o repositório dos pais para inserir eles
- Exemplo: No caso de uso de inserção do cursista, ele chama diretamente o UserRepository
- O código ainda funciona, mas pode ser melhorado

5. Reestruturar melhor o Material Prático do cursista
- Está misturado o conceito de relatório prático e material do cursista
- É interessante reestudar essa parte e reestruturar esse trecho