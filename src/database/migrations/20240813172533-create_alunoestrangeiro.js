'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('foreign_isfstudent', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      paisOrigem: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comprovante: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })

    await queryInterface.addConstraint('foreign_isfstudent', {
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
