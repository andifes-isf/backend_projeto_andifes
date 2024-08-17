"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _cursistaespecializacao = require('../../app/models/cursistaespecializacao'); var _cursistaespecializacao2 = _interopRequireDefault(_cursistaespecializacao);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cursistas = [
      {
        login: "Carlos",
        idioma: "ingles",
        nivel: "C1",
        comprovante: "comprovante de proeficiencia nivel C1"
      },
      {
        login: "Pedro",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel B2"
      }
    ]

    try {  
      await _cursistaespecializacao2.default.bulkCreate(cursistas, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cursistaespecializacao', null, {})
  }
};
