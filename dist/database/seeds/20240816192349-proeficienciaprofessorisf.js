"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _proeficienciaprofessorisf = require('../../app/models/proeficiencia/proeficienciaprofessorisf'); var _proeficienciaprofessorisf2 = _interopRequireDefault(_proeficienciaprofessorisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const proeficiencias = [
      {
        login: "Carlos",
        idioma: "ingles",
        nivel: "C1",
        comprovante: "comprovante de proeficiencia nivel C1"
      },
      {
        login: "Pietro",
        idioma: "Italiano",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Pedro",
        idioma: "frances",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Kactus",
        idioma: "japones",
        nivel: "N2",
        comprovante: "comprovante de proeficiencia nivel N2"
      }
    ]

    try {  
      await _proeficienciaprofessorisf2.default.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isfteacher_proeficiency', null, {})
  }
};
