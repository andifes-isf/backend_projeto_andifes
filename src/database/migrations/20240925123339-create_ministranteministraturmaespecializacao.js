'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ministranteministraturmaespecializacao', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nomeTurma: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('ministranteministraturmaespecializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_ministranteministraturmaespecializacao',
      references: {
        table: 'minister_teacher',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('ministranteministraturmaespecializacao', {
      fields: ['nomeTurma'],
      type: 'foreign key',
      name: 'fk_nomeTurma_ministranteministraturmaespecializacao',
      references: {
        table: 'turmadisciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ministranteministraturmaespecializacao', 'fk_login_ministranteministraturmaespecializacao', null)

    await queryInterface.removeConstraint('ministranteministraturmaespecializacao', 'fk_nomeTurma_ministranteministraturmaespecializacao', null)

    return queryInterface.dropTable('ministranteministraturmaespecializacao')
  }
};
