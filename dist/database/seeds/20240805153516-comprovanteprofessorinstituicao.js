"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _comprovanteprofessorinstituicao = require('../../app/models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'); var _comprovanteprofessorinstituicao2 = _interopRequireDefault(_comprovanteprofessorinstituicao);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comprovantes = [
      {
        login: "Pedro",
        idInstituicao: 2,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Pedro na UFSCar"
      },
      {
        login: "Carlos",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Carlos na UFMG"
      },
      {
        login: "Pietro",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Pietro na UFSCar"
      },
      {
        login: "Kactus",
        idInstituicao: 4,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Kactus na UFTPR"
      }
    ]

    await _comprovanteprofessorinstituicao2.default.bulkCreate(comprovantes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comprovanteprofessorinstituicao', null, {})
  }
};
