"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('usuario', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nome: {
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
      etnia: {
        type: Sequelize.ENUM('amarelo', 'branco', 'indigena', 'pardo', 'preto', 'quilombola')
      },
      genero: {
        type: Sequelize.ENUM('feminino', 'masculino', 'nao binario', 'outros')
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
      senha_encriptada: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante'),
        allowNull: false
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('usuario')
  }
};
