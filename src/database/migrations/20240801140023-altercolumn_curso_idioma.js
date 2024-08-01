'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('curso', 'idioma', {
      type: Sequelize.ENUM('ingles', 'portugues', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // O método down precisa reverter as alterações feitas no método up. 
    // Aqui você deve restaurar o estado original do ENUM antes da alteração.
    await queryInterface.changeColumn('usuarios', 'idioma', {
      type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'), // Valores originais do ENUM
      allowNull: false,
    });
  }
};
