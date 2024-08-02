"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('usuario', 'senha', 'senha_encriptada')
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('usuario', 'senha_encriptada', 'senha')
  }
};
