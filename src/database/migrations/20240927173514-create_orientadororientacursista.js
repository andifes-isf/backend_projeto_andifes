'use strict'

// import { Sequelize } from "sequelize"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orientadororientacursista', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      loginOrientador: {
        type: Sequelize.STRING
      },
      loginCursista: {
        type: Sequelize.STRING
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
        table: 'advisor_teacher',
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
        table: 'specialization_student',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('orientadororientacursista', {
      fields: ['loginCursista', 'loginOrientador', 'inicio'],
      type: 'unique',
      name: 'unique_cursista_orientador_inicio_orientacao'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('orientadororientacursista', 'fk_loginorientador_orientadororientacursista', null)

    await queryInterface.removeConstraint('orientadororientacursista', 'fk_logincursista_orientadororientacursista', null)

    return queryInterface.dropTable('orientadororientacursista')
  }
};
