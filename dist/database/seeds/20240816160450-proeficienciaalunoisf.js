"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _proeficienciaalunoisf = require('../../app/models/proeficiencia/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const proeficiencias = [
      {
        login: "Arata",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Arata",
        idioma: "ingles",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Balla",
        idioma: "frances",
        nivel: "A2",
        comprovante: "comprovante de proeficiencia nivel A2"
      },
      {
        login: "Bruno",
        idioma: "ingles",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Portix",
        idioma: "ingles",
        nivel: "C1",
        comprovante: "comprovante de proeficiencia nivel C1"
      },
      {
        login: "Guto",
        idioma: "italiano",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Gaby",
        idioma: "ingles",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Victin",
        idioma: "japones",
        nivel: "N4",
        comprovante: "comprovante de proeficiencia nivel N4"
      }
    ]

    try {  
      await _proeficienciaalunoisf2.default.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      console.log(error)
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isfstudent_proeficiency', null, {})
  }
};
