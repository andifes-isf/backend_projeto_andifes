'use strict'

const { date } = require('yup');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('interessenadisciplina', {
      login: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nomeDisciplina: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      preferencia: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ano: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('interessenadisciplina', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_interessenadisciplina',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('interessenadisciplina', {
      fields: ['nomeDisciplina'],
      type: 'foreign key',
      name: 'fk_nomeDisciplina_interessenadisciplina',
      references: {
        table: 'disciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('interessenadisciplina', 'fk_login_interessenadisciplina', null)
    
    await queryInterface.removeConstraint('interessenadisciplina', 'fk_nomeDisciplina_interessenadisciplina', null)

    await queryInterface.removeConstraint('interessenadisciplina', 'unique_loginpreferenciaano_interessenadisciplina', null)

    return queryInterface.dropTable('interessenadisciplina')
  }
};
