'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('co_class', {
      idTurma: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },

      // Único deve ser o conjunto entre nome e Oferta Coletiva (a menos que adicionemos a oferta no nome)

      nome: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
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

    await queryInterface.addConstraint('co_class', {
      fields: ['idTurma', 'idCurso'],
      type: 'unique',
      name: 'unique_idTurma_idCurso'
    })

    await queryInterface.addConstraint('co_class', {
      fields: ['idCurso'],
      type: 'foreign key',
      name: 'fk_idCurso_turmaoc',
      references: {
        table: 'course',
        field: 'idCurso'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
