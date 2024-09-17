'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('editalcursoespecializacao', {
      ano: {
        type: Sequelize.CHAR(4),
        primaryKey: true
      },
      documento: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      listaAprovados: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('editalcursoespecializacao')
  }
};
