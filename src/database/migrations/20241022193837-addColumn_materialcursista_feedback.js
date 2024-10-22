'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'feedback',
      {
        type: Sequelize.TEXT,
      }
    )

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RELATORIO_PRATICO', 'feedback')
  }
};
