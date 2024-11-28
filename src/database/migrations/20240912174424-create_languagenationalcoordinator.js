'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('language_national_coordinator', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      language: {
        type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
        allowNull: false
      },

    })

    await queryInterface.addConstraint('language_national_coordinator', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_coordenadornacionalidioma',
      references: {
        table: 'user',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
