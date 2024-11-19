'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('professorisfministraturmaoc', {
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

    await queryInterface.addConstraint('professorisfministraturmaoc', {
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

    await queryInterface.addConstraint('professorisfministraturmaoc', {
      fields: ['idTurma'],
      type: 'foreign key',
      name: 'fk_idTurma_professorisfministraturmaoc',
      references: {
        table: 'turmaoc',
        field: 'idTurma'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async () => {}
};
