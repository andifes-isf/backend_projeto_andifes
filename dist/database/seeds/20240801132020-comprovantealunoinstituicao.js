"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _comprovantealunoinstituicao = require('../../app/models/usuario_pertence_instituicao/comprovantealunoinstituicao'); var _comprovantealunoinstituicao2 = _interopRequireDefault(_comprovantealunoinstituicao);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comprovantes = [
      {
        login: "Arata",
        idInstituicao: 2,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Arata na UFSCar"
      },
      {
        login: "Balla",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Balla na UFMG"
      },
      {
        login: "Bruno",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Bruno na UFSCar"
      },
      {
        login: "Portix",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Portix na UFSCar"
      },
      {
        login: "Guto",
        idInstituicao: 4,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Guto na UFTPR"
      },
      {
        login: "Gaby",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Gaby na UFSCar"
      },
    ]

    await _comprovantealunoinstituicao2.default.bulkCreate(comprovantes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comprovante_aluno_instituicao', null, {})
  }
};
