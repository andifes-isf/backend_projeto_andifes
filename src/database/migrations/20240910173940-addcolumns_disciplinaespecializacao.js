'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      queryInterface.addColumn(
        'disciplinaespecializacao', 
        'eixoTematico', 
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
      queryInterface.addColumn(
        'disciplinaespecializacao', 
        'categoria', 
        {
          type: Sequelize.ENUM('nucleo comum', 'para todos os idiomas', 'japones', 'ingles', 'portugues', 'espanhol', 'frances', 'italiano', 'alemao'),
          allowNull: false
        }
      )
    }) 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(transaction => {
      queryInterface.removeColumn('disciplinaespecializacao', 'eixoTematico', { transaction: transaction })
      queryInterface.removeColumn('disciplinaespecializacao', 'categoria', { transaction: transaction })
    }) 
  }
};
