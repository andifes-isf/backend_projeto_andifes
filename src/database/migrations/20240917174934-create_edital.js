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
        allowNull: true
      },
      criador: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('editalcursoespecializacao', {
      fields: ['criador'],
      type: 'foreign key',
      name: 'fk_criador_editalcursoespecializacao',
      references: {
        table: 'coordenadornacional',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('editalcursoespecializacao')
  }
};
