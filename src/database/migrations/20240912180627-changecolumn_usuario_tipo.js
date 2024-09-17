'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('usuario', 'tipo', {
      type: Sequelize.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docente'),
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
