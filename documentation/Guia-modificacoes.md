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
