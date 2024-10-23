'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('validacaomaterial', 'fk_loginorientador_validacaomaterial', null)

    await queryInterface.removeConstraint('validacaomaterial', 'fk_logincursista_validacaomaterial', null)
    
    await queryInterface.removeConstraint('validacaomaterial', 'fk_nomeMaterial_validacaomaterial', null)

    await queryInterface.removeIndex('RELATORIO_PRATICO', 'idx_nome_materialcursista')

    return queryInterface.dropTable('validacaomaterial')
  },

  down: async (queryInterface, Sequelize) => {
  }
};
