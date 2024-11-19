'use strict'

const { date } = require('yup');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ouvidoria_curso_especializacao', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      topico_mensagem: {
        type: Sequelize.ENUM('orientações', 'aulas moodle', 'horas práticas', 'questões administrativas', 'outros'),
        allowNull: false
      },
      mensagem: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      anonimo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      login: {
        type: Sequelize.STRING
      },
      creation_date: {
        type: Sequelize.DATEONLY
      }
    })

    await queryInterface.addConstraint('ouvidoria_curso_especializacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_ouvidoria_curso_especializacao',
      references: {
        table: 'specialization_student',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('ouvidoria_curso_especializacao', 'fk_login_ouvidoria_curso_especializacao', null)

    return queryInterface.dropTable('ouvidoria_curso_especializacao')
  }
};
