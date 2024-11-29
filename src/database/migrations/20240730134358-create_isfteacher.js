'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isf_teacher', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      poca: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      start: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      end: Sequelize.DATEONLY,
      specialization_student: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('isf_teacher', {
      fields: ['login', 'start'],
      type: 'unique',
      name: 'unique_login_start_professorisf'
    })

    await queryInterface.addConstraint('isf_teacher', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_professorisf',
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
