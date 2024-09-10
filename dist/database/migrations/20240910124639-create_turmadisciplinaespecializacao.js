"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turmadisciplinaespecializacao', {
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      idTurma: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      mesOferta: {
        type: Sequelize.ENUM('janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro')
      },
      numeroVagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numeroMinimoAlunos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numeroInscritos: {
        type: Sequelize.INTEGER
      },
      numeroDesistentes: {
        type: Sequelize.INTEGER
      },
      numeroAprovador: {
        type: Sequelize.INTEGER
      },
      numeroReprovador: {
        type: Sequelize.INTEGER
      }
    })

    await queryInterface.addConstraint('turmadisciplinaespecializacao', {
      fields: ['nome'],
      type: 'foreign key',
      name: 'fk_nome_turmadisciplinaespecializacao',
      references: {
        table: 'disciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
