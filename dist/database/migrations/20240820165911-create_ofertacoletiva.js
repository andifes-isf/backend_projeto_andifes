"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ofertacoletiva', {
      ano: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      edicao: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {}
};
