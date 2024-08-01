"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.addColumn(
        'turmaoc', 
        'nome', 
        {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        {
          transaction: transaction
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
