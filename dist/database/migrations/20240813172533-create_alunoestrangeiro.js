"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alunoisfestrangeiro', {
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paisOrigem: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      comprovante: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })

    await queryInterface.addConstraint('alunoisfestrangeiro', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunoisfestrangeiro',
      references: {
        table: 'alunoisf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
