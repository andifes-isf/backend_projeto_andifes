"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _professorisf = require('../../app/models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professores = [
      {
        login: "Carlos",
        poca: "Certificado POCA do Carlos",
        inicio: "2024-01-20",
        cursista: 1
      },
      {
        login: "Pietro",
        poca: "Certificado POCA do Pietro",
        inicio: "2024-01-20",
        cursista: 1
      },
      {
        login: "Pedro",
        poca: "Certificado POCA do Pedro",
        inicio: "2024-01-20",
        cursista: 1
      },
      {
        login: "Yumi",
        poca: "Certificado POCA da Yumi",
        inicio: "2024-01-20",
        cursista: 0
      },
      {
        login: "Enio",
        poca: "Certificado POCA do Enio",
        inicio: "2024-01-20",
        cursista: 0
      }
    ]

    await _professorisf2.default.bulkCreate(professores, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professorisf', null, {})
  }
};
