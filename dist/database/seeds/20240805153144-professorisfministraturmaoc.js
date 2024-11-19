"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _professorisfministraturmaoc = require('../../app/models/ofertacoletiva/professorisfministraturmaoc'); var _professorisfministraturmaoc2 = _interopRequireDefault(_professorisfministraturmaoc);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const relacoes = [
      {
        login: "Carlos",
        idTurma: 1,
        inicio: "2020-11-10"
      },
      {
        login: "Carlos",
        idTurma: 2,
        inicio: "2020-11-10"
      },
      {
        login: "Pietro",
        idTurma: 3,
        inicio: "2020-11-10"
      },
      {
        login: "Pietro",
        idTurma: 4,
        inicio: "2020-11-10"
      },
      {
        login: "Pedro",
        idTurma: 6,
        inicio: "2020-11-10"
      },
      {
        login: "Pedro",
        idTurma: 5,
        inicio: "2020-11-10"
      },
    ]

    await _professorisfministraturmaoc2.default.bulkCreate(relacoes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isfteacher_ministre_occlass', null, {})
  }
};
