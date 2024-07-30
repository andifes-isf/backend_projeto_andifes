'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('usuarios', 'name', 'nome')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('usuarios', 'nome', 'name')
  }
};
