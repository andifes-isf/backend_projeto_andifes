'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('notificacao', 'tipo', {
      type: Sequelize.ENUM('pendencia', 'feedback', 'aviso'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('notificacao', 'tipo', {
      type: Sequelize.ENUM('pendencia', 'feedback'),
      allowNull: false,
    });
  }
};
