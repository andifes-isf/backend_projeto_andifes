'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      queryInterface.addColumn(
        'validacaomaterial', 
        'visualizadoPeloCursistaAposAnalise', 
        {
          type: Sequelize.TINYINT,
          defaultValue: false
        }
      )

      queryInterface.renameColumn('validacaomaterial', 'analisado', 'analisadoPeloOrientador')
    }) 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      queryInterface.removeColumn('validacaomaterial', 'visualizadoPeloCursistaAposAnalise', { transaction: transaction })
      queryInterface.renameColumn('validacaomaterial', 'analisadoPeloOrientador', 'analisado', { transaction: transaction })
    }) 
  }
};
