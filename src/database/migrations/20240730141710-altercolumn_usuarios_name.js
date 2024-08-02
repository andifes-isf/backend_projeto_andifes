'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('usuario', 'name', 'nome')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('usuario', 'nome', 'name')
  }
};
