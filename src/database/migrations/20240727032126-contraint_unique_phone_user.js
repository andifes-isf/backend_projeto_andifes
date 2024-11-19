'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addIndex('user', ['DDI', 'DDD', 'phone'], {
      unique: true,
      name: 'unique_telefone',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('user', 'unique_telefone')
  }
};
