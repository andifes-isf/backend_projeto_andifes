'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turmaoc', {
      idTurma: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      idCurso: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      nVagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nInscritos: Sequelize.INTEGER,
      nConcluintes: Sequelize.INTEGER,
      nReprovados: Sequelize.INTEGER,
    })

    await queryInterface.addConstraint('turmaoc', {
      fields: ['idTurma', 'idCurso'],
      type: 'unique',
      name: 'unique_idTurma_idCurso'
    })

    await queryInterface.addConstraint('turmaoc', {
      fields: ['idCurso'],
      type: 'foreign key',
      name: 'fk_idCurso_turmaoc',
      references: {
        table: 'curso',
        field: 'idCurso'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
