"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _proeficienciaalunoisf = require('../../app/models/proeficienciaalunoisf'); var _proeficienciaalunoisf2 = _interopRequireDefault(_proeficienciaalunoisf);

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
        idioma: "japones",
        nivel: "N2",
        comprovante: "comprovante de proeficiencia nivel N2"
      },
      {
        login: "Pedro",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel B2"
      }
    ]

    try {  
      await _proeficienciaalunoisf2.default.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('proeficienciaalunoisf', null, {})
    await queryInterface.sequelize.query('ALTER TABLE instituicaoensino AUTO_INCREMENT = 1')
  }
};
