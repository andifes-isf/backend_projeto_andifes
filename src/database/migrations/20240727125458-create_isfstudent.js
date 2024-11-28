'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isf_student', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      from_institution: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('isf_student', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisf',
      references: {
        table: 'user',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
