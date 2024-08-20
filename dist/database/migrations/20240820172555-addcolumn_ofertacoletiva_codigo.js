"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.addColumn(
        'ofertacoletiva', 
        'codigo', 
        {
          type: Sequelize.STRING,
          set(value) {
            this.setDataValue('codigo', `${this.ano}_${this.edicao}`)
          }
        },
        {
          transaction: transaction
        }
      )
    }) 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      return queryInterface.removeColumn('ofertacoletiva', 'codigo', { transaction: transaction })
    }) 
  }
};
