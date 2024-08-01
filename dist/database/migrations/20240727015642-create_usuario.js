"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuarios', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sobrenome: {
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
      telefone: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      raca: {
        type: Sequelize.ENUM('branco', 'pardo', 'preto', 'amarelo', 'indigena')
      },
      genero: {
        type: Sequelize.ENUM('masculino', 'feminino', 'nao binario')
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      nomeEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      dominio: {
        type: Sequelize.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('alunoisf', 'professorisf'),
        allowNull: false
      }
    })
  },

  down: () => {}
};
