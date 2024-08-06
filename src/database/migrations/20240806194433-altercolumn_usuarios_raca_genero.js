'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.renameColumn('usuario', 'raca', 'etnia')

      await queryInterface.changeColumn(
        'usuario', 
        'etnia', 
        {
          type: Sequelize.ENUM('amarelo', 'branco', 'indigena', 'pardo', 'preto', 'quilombola'),
          allowNull: false
        },
        {
          transaction: transaction
        }
      )

      await queryInterface.changeColumn(
        'usuario',
        'genero',
        {
          type: Sequelize.ENUM('feminino', 'masculino', 'nao binario', 'outros')
        }
      )

    }) 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.removeColumn('turmaoc', 'nome', { transaction: transaction })
    }) 
  }
};
