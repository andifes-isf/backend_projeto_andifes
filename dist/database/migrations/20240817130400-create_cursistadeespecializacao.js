"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cursistaespecializacao', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('cursistaespecializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_cursistaespecializacao',
      references: {
        table: 'professorisf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
