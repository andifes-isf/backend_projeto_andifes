"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comprovanteprofessorinstituicao', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      idInstituicao: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY,
      comprovanteMatricula: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    })

    await queryInterface.addConstraint('comprovanteprofessorinstituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_comprovanteprofessorinstituicao',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('comprovanteprofessorinstituicao', {
      fields: ['idInstituicao'],
      type: 'foreign key',
      name: 'fk_idInstituicao_comprovanteprofessorinstituicao',
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
