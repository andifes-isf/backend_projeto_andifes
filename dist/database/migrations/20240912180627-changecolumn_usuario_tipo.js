"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuario', 'tipo', {
      type: Sequelize.ENUM('alunoisf', 'professorisf', 'coordenadornacional', 'coordenadornacionalidioma', 'docente'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuario', 'tipo', {
      type: Sequelize.ENUM('alunoisf', 'professorisf'),
      allowNull: false,
    });
  }
};
