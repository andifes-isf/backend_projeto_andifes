# Guia de modificações do sistema

## Adicionar novas migrações
`yarn migrate-create nome_da_migracao`

Para rodar a migração, é preciso rodar o seguinte comando:
- `yarn migrate`

Também há um comando para refazer o banco de dados:
- `yarn restart-db`

## Adicionar novas seeds
`yarn seed-create nome_da_seed`

Para rodar a seed, é preciso rodar o seguinte comando:
- `yarn seed`

Importante, o comando `yarn restart-db` , além de recriar as tabelas, também roda todas as migrações

## Modificar entidades
### Adicionar uma nova entidade
Para adicionar uma nova entidade no sistema, é preciso seguir a seguinte estrutura

-- Entities

---- nome_entidade

-------- repository (responsável por fazer a comunicação do sistema com o sequelize)

-------- use-cases (casos de uso da entidade)

-------- validators (validadores para a entidade)

-------- Nome_entidade.js (model da entidade)

-------- entidadeController.js (agrupa os casos de uso e fornece as funcionalidades)

-------- entidadeRoutes.js (agrupa os endpoints do sistema)

### Adicionar um novo caso de uso
Para adicionar um novo caso de uso, basta seguir o seguinte passo
- Criar um novo arquivo na pasta use-cases da entidade
- Verificar se é preciso adicionar um método no repository
- Adicionar no controller o uso desse use-case
- Adicionar nas rotas esse novo endpoint