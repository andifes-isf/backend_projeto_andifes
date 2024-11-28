'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isfstudent_foreign', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      home_country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      register: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })

    await queryInterface.addConstraint('isfstudent_foreign', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisfestrangeiro',
      references: {
        table: 'isf_student',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
