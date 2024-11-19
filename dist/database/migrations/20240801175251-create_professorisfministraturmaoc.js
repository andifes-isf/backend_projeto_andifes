"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isfteacher_ministre_occlass', {
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
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY
    })

    await queryInterface.addConstraint('isfteacher_ministre_occlass', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_professorisfministraturmaoc',
      references: {
        table: 'professor_isf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('isfteacher_ministre_occlass', {
      fields: ['idTurma'],
      type: 'foreign key',
      name: 'fk_idTurma_professorisfministraturmaoc',
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
