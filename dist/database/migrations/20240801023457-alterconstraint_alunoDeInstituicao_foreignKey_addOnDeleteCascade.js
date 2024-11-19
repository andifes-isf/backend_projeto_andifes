"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('alunoisfdeinstituicao', 'fk_login_alunodeinstituicao');

    await queryInterface.addConstraint('alunoisfdeinstituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunodeinstituicao',
      references: {
        table: 'aluno_isf',
        field: 'login'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove o constraint e reverte para o comportamento padrão se necessário
    await queryInterface.removeConstraint('alunoisfdeinstituicao', 'fk_login_alunodeinstituicao');

    await queryInterface.addConstraint('alunoisfdeinstituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunodeinstituicao',
      references: {
        table: 'aluno_isf',
        field: 'login'
      },
      onDelete: 'NO ACTION' // ou qualquer outro comportamento desejado
    });
  }
};
