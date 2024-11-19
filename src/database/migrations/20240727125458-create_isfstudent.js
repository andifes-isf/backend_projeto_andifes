'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aluno_isf', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      deInstituicao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('aluno_isf', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisf',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
