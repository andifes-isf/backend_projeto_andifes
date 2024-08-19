'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.addColumn(
        'professorisf', 
        'cursista', 
        {
          type: Sequelize.BOOLEAN,
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
      return queryInterface.removeColumn('professorisf', 'cursista', { transaction: transaction })
    }) 
  }
};
