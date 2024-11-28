'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('minister_teacher', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    })

    await queryInterface.addConstraint('minister_teacher', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_docenteministrante',
      references: {
        table: 'user',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('minister_teacher')
  }
};
