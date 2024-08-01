"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('professorisfministraturmaoc', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'professorisf',
          key: 'login',
          name: 'fk_login_professorisf_ministra_turmaoc'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idTurma: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'turmaoc',
          key: 'idTurma',
          name: 'fk_idTurma_professorisf_ministra_turmaoc'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY
    })
  },

  down: async () => {}
};
