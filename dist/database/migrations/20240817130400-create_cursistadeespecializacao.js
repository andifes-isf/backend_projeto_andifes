"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('specialization_student', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      practical_hours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nc_hours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ccti_hours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ccip_hours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      cci_hours: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
    })

    await queryInterface.addConstraint('specialization_student', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_cursistaespecializacao',
      references: {
        table: 'isf_teacher',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
