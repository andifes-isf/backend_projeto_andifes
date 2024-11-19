'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cursistacursaturmaespecializacao', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nomeTurma: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM('nao iniciado', 'em andamento', 'aprovado', 'reprovado', 'desistente', 'evadido'),
        allowNull: false,
        defaultValue: 'nao iniciado'
      }
    })

    await queryInterface.addConstraint('cursistacursaturmaespecializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_cursistacursaturmaespecializacao',
      references: {
        table: 'cursista_especializacao',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('cursistacursaturmaespecializacao', {
      fields: ['nomeTurma'],
      type: 'foreign key',
      name: 'fk_nomeTurma_cursistacursaturmaespecializacao',
      references: {
        table: 'turmadisciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('cursistacursaturmaespecializacao', 'fk_login_cursistacursaturmaespecializacao', null)

    await queryInterface.removeConstraint('cursistacursaturmaespecializacao', 'fk_nomeTurma_cursistacursaturmaespecializacao', null)

    return queryInterface.dropTable('cursistacursaturmaespecializacao')
  }
};
