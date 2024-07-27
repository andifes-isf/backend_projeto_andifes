'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'usuarios',
      [
        {
          login: 'Arata',
          name: 'Rafael',
          sobrenome: 'Uyeta',
          DDI: 55,
          DDD: 16,
          telefone: 123456789,
          raca: 'amarelo',
          genero: 'masculino',
          nomeEmail: 'arata',
          dominio: 'gmail.com',
          senha: 'senha',
          tipo: 'alunoisf'
        }
      ]
    )
  },

  down: () => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
