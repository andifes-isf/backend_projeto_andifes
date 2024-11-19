'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comprovante_aluno_instituicao', {
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

    await queryInterface.addConstraint('comprovante_aluno_instituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_comprovantealunoinstituicao',
      references: {
        table: 'isfstudent_institution',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('comprovante_aluno_instituicao', {
      fields: ['idInstituicao'],
      type: 'foreign key',
      name: 'fk_idInstituicao_comprovantealunoinstituicao',
      references: {
        table: 'instituicao_ensino',
        field: 'idInstituicao'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
