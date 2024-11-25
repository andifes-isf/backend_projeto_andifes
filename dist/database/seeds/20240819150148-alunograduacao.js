"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _alunograduacao = require('../../app/models/usuarios/alunograduacao'); var _alunograduacao2 = _interopRequireDefault(_alunograduacao);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunos = [
      {
        login: "Pietro"
      },
      {
        login: "Carlos"
      }
    ]

    try {  
      await _alunograduacao2.default.bulkCreate(alunos, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('graduation_student', null, {})
  }
};
