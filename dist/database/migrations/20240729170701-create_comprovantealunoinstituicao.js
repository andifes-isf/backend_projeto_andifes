"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comprovantealunoinstituicao', {
      idInstituicao: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY,
      comprovante: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('comprovantealunoinstituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_comprovante_aluno_instituicao',
      references: {
        table: 'alunoisfdeinstituicao',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('comprovantealunoinstituicao', {
      fields: ['idInstituicao'],
      type: 'foreign key',
      name: 'fk_idInstituicao_comprovantealunoinstituicao',
      references: {
        table: 'instituicaoensino',
        field: 'idInstituicao'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
