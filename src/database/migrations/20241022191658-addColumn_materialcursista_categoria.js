'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'categoria',
      {
        type: Sequelize.ENUM('preparacao do curso', 'preparacao material didatico', 'preparacao de atividades', 'preparacao de aulas', 'preparacao de oficinas', 'preparacao de testes de nivelamento'),
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RELATORIO_PRATICO', 'categoria')

  }
};
