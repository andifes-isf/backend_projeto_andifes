'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('proeficienciaalunoisf', {
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
      }
    })

    await queryInterface.addConstraint('proeficienciaalunoisf', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_proeficienciaalunoisf',
      references: {
        table: 'aluno_isf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
