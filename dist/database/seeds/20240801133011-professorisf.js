"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _professorisf = require('../../app/models/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professores = [
      {
        login: "Carlos",
        poca: "Certificado POCA da Carlos",
        inicio: "2024-01-20"
      },
      {
        login: "Pietro",
        poca: "Certificado POCA da Pietro",
        inicio: "2024-01-20"
      },
      {
        login: "Pedro",
        poca: "Certificado POCA da Pedro",
        inicio: "2024-01-20"
      }
    ]

    await _professorisf2.default.bulkCreate(professores, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professorisf', null, {})
  }
};
