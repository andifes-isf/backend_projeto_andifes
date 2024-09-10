"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('turmadisciplinaespecializacao', 'numeroAprovador', 'numeroaprovados')

    await queryInterface.renameColumn('turmadisciplinaespecializacao', 'numeroReprovador', 'numeroReprovados')
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('turmadisciplinaespecializacao', 'numeroAprovados', 'numeroAprovador')
  
    await queryInterface.renameColumn('turmadisciplinaespecializacao', 'numeroReprovados', 'numeroReprovador')
  }
};
