"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _professorisf = require('../../app/models/usuarios/professorisf'); var _professorisf2 = _interopRequireDefault(_professorisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professores = [
      {
        login: "Carlos",
        poca: "Certificado POCA do Carlos",
        start: "2024-01-20",
        specialization_student: 0
      },
      {
        login: "Pietro",
        poca: "Certificado POCA do Pietro",
        start: "2024-01-20",
        specialization_student: 0
      },
      {
        login: "Pedro",
        poca: "Certificado POCA do Pedro",
        start: "2024-01-20",
        specialization_student: 1
      },
      {
        login: "Kactus",
        poca: "Certificado POCA da Kaory",
        start: "2024-01-20",
        specialization_student: 1
      },
    ]

    await _professorisf2.default.bulkCreate(professores, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isf_teacher', null, {})
  }
};
