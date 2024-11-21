'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('advisor_teacher', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    })

    await queryInterface.addConstraint('advisor_teacher', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_docenteorientador',
      references: {
        table: 'user',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('advisor_teacher')
  }
};
