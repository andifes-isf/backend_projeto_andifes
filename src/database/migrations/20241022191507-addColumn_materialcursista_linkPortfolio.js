'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'link_portfolio',
      {
        type: Sequelize.TEXT,
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('RELATORIO_PRATICO', 'link_portfolio')
  }
};
