"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isfstudent_in_occlass', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      idTurma: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      termino: Sequelize.DATEONLY
    })

    await queryInterface.addConstraint('isfstudent_in_occlass', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisfparticipaturmaoc',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('isfstudent_in_occlass', {
      fields: ['idTurma'],
      type: 'foreign key',
      name: 'fk_idTurma_alunoisfparticipaturmaoc',
      references: {
        table: 'co_class',
        field: 'idTurma'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async () => {}
};
