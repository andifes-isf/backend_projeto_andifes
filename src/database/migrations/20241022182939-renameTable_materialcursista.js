'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('materialcursista', 'RELATORIO_PRATICO')
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('RELATORIO_PRATICO', 'materialcursista')
  }
};
