'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alunoisfparticipaturmaoc', {
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
        allowNull: false
      },
      termino: Sequelize.DATEONLY
    })

    await queryInterface.addConstraint('alunoisfparticipaturmaoc', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisfparticipaturmaoc',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('alunoisfparticipaturmaoc', {
      fields: ['idTurma'],
      type: 'foreign key',
      name: 'fk_idTurma_alunoisfparticipaturmaoc',
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
