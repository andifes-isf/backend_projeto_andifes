"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _proeficienciaalunoisf = require('../../app/models/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const proeficiencias = [
      {
        login: "Arata",
        idioma: "ingles",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Arata",
        idioma: "japones",
        nivel: "N4",
        comprovante: "comprovante de proeficiencia nivel N4"
      },
      {
        login: "Balla",
        idioma: "ingles",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Balla",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Bruno",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Bruno",
        idioma: "frances",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Portix",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Portix",
        idioma: "italiano",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Guto",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Guto",
        idioma: "ingles",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Gaby",
        idioma: "ingles",
        nivel: "A2",
        comprovante: "comprovante de proeficiencia nivel A2"
      },
      {
        login: "Gaby",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
    ]

    try {  
      await _proeficienciaalunoisf2.default.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('proeficienciaalunoisf', null, {})
  }
};
