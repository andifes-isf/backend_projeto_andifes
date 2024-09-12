'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coordenadornacionalidioma', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      idioma: {
        type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
        allowNull: false
      },

    })

    await queryInterface.addConstraint('coordenadornacionalidioma', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_coordenadornacionalidioma',
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
