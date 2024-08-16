"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _alunoestrangeiro = require('../../app/models/alunoestrangeiro'); var _alunoestrangeiro2 = _interopRequireDefault(_alunoestrangeiro);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosEstrangeiro = [
      {
        paisOrigem: "Japão",
        tipo: "RG",
        codigo: "Codigo da Kactus",
        login: 'Kactus'
      },
      {
        paisOrigem: "Japão",
        tipo: "RG",
        codigo: "Codigo do Victin",
        login: 'Victin'
      },
      {
        paisOrigem: "Itália",
        tipo: "RG",
        codigo: "Codigo do JP",
        login: 'JP'
      },
    ]

    try {
      
      await _alunoestrangeiro2.default.bulkCreate(alunosEstrangeiro, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunoisfestrangeiro', null, {})
  }
};
