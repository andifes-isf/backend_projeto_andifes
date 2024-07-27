'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Usuarios', ['DDI', 'DDD', 'telefone'], {
      unique: true,
      name: 'unique_telefone',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Usuarios', 'unique_telefone')
  }
};
