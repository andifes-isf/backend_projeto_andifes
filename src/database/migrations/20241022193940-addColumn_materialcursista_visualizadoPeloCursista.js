'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'visualizado_pelo_cursista',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RELATORIO_PRATICO', 'visualizado_pelo_cursista')
  }
};
