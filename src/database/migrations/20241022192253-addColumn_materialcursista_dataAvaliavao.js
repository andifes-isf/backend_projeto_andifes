'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'data_avaliacao',
      {
        type: Sequelize.DATEONLY,
      }
    )

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RELATORIO_PRATICO', 'data_avaliacao')
  }
};
