'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alteracaoturmaespecializacao', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nomeTurma: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      dataModificacao: {
        type: Sequelize.DATE,
        primaryKey: true
      },
      valorAnteriorNumeroVagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valorPosteriorNumeroVagas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      valorAnteriorNumeroMinimoAlunos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      valorPosteriorNumeroMinimoAlunos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('alteracaoturmaespecializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alteracaoturmaespecializacao',
      references: {
        table: 'language_national_coordinator',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('alteracaoturmaespecializacao', {
      fields: ['nomeTurma'],
      type: 'foreign key',
      name: 'fk_nomeTurma_alteracaoturmaespecializacao',
      references: {
        table: 'turmadisciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('alteracaoturmaespecializacao')
  }
};
