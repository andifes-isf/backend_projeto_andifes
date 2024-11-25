'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      DDI: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      DDD: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ethnicity: {
        type: Sequelize.ENUM('amarelo', 'branco', 'indigena', 'pardo', 'preto', 'quilombola')
      },
      gender: {
        type: Sequelize.ENUM('feminino', 'masculino', 'nao binario', 'outros')
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email_domain: {
        type: Sequelize.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
        allowNull: false
      },
      encrypted_password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante'),
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
};
