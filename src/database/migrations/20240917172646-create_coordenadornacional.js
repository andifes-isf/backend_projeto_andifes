'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coordenadornacional', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    })

    await queryInterface.addConstraint('coordenadornacional', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_coordenadornacional',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('coordenadornacional')
  }
};
