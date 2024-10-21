'use strict'

const { date } = require('yup');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('interessenadisciplina', {
      fields: ['login', 'preferencia', 'ano'],
      type: 'unique',
      name: 'unique_loginpreferenciaano_interessenadisciplina',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('interessenadisciplina', 'unique_loginpreferenciaano_interessenadisciplina', null)
  }
};
