'use strict'

// import { Sequelize } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orientadororientacursista', {
      loginOrientador: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      loginCursista: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'ativo'
      },
      inicio: {
        type: Sequelize.DATEONLY
      },
      termino: {
        type: Sequelize.DATEONLY,
      }
    })

    await queryInterface.addConstraint('orientadororientacursista', {
      fields: ['loginOrientador'],
      type: 'foreign key',
      name: 'fk_loginorientador_orientadororientacursista',
      references: {
        table: 'docenteorientador',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('orientadororientacursista', {
      fields: ['loginCursista'],
      type: 'foreign key',
      name: 'fk_logincursista_orientadororientacursista',
      references: {
        table: 'cursistaespecializacao',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('orientadororientacursista', 'fk_loginorientador_orientadororientacursista', null)

    await queryInterface.removeConstraint('orientadororientacursista', 'fk_logincursista_orientadororientacursista', null)

    return queryInterface.dropTable('orientadororientacursista')
  }
};
