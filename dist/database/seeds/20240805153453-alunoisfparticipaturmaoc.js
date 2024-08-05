"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _alunoisfparticipaturmaoc = require('../../app/models/alunoisfparticipaturmaoc'); var _alunoisfparticipaturmaoc2 = _interopRequireDefault(_alunoisfparticipaturmaoc);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const relacoes = [
      {
        login: "Arata",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Balla",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Bruno",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Portix",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Guto",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Gaby",
        idTurma: 1,
        inicio: "2021-04-20",
      },
    ]

    await _alunoisfparticipaturmaoc2.default.bulkCreate(relacoes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alunoisfparticipaturmaoc', null, {})
  }
};
