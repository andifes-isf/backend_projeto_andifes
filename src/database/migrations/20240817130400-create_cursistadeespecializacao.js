'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cursista_especializacao', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      horas_praticas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      horas_NC: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      horas_CCTI: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      horas_CCIP: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      horas_CCI: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    })

    await queryInterface.addConstraint('cursista_especializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_cursistaespecializacao',
      references: {
        table: 'professor_isf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
