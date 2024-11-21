'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('graduation_student', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('graduation_student', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunograduacao',
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
