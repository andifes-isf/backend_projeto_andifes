"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turmadisciplinaespecializacao', {
      idTurma: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      disciplina: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        unique: true
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
      numeroAprovados: {
        type: Sequelize.INTEGER
      },
      numeroReprovados: {
        type: Sequelize.INTEGER
      }
    })

    await queryInterface.addConstraint('turmadisciplinaespecializacao', {
      fields: ['disciplina'],
      type: 'foreign key',
      name: 'fk_disciplina_turmadisciplinaespecializacao',
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
