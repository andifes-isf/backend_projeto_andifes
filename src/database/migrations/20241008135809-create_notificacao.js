'use strict'

const { date } = require('yup');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.createTable('notificacao', {
        idNotificacao: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        login: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        mensagem: {
          type: Sequelize.STRING,
          allowNull: false
        },
        tipo: {
          type: Sequelize.ENUM('pendencia', 'feedback'),
          allowNull: false
        },
        chaveReferenciado: {
          type: Sequelize.STRING,
          allowNull: false
        },
        modeloReferenciado: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lida: {
          type: Sequelize.TINYINT,
          defaultValue: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }, {
        transaction: transaction
      })
  
      await queryInterface.addConstraint('notificacao', {
        fields: ['login'],
        type: 'foreign key',
        name: 'fk_login_notificacao',
        references: {
          table: 'usuario',
          field: 'login'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction: transaction
      })
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('notificacao', 'fk_login_notificacao', null)

    return queryInterface.dropTable('notificacao')
  }
};
