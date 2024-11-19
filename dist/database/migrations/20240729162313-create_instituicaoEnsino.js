"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('instituicao_ensino', {
      idInstituicao: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      documentoVinculo: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      brasileira: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })
  },

  down: () => {}
};
