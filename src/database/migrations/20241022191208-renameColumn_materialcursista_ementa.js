'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('RELATORIO_PRATICO', 'ementa', 'descricao')
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('RELATORIO_PRATICO', 'descricao', 'ementa');
  }
};
