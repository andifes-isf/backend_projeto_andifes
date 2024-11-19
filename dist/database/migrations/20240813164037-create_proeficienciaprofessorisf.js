"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proeficienciaprofessorisf', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      idioma: {
        type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
        primaryKey: true
      },
      nivel: {
        type: Sequelize.CHAR(2),
        primaryKey: true
      },
      comprovante: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    })

    await queryInterface.addConstraint('proeficienciaprofessorisf', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_proeficienciaprofessorisf',
      references: {
        table: 'professor_isf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
