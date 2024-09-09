"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _instituicaoensino = require('../../app/models/instituicao/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _instituicaoensinoestrangeira = require('../../app/models/instituicao/instituicaoensinoestrangeira'); var _instituicaoensinoestrangeira2 = _interopRequireDefault(_instituicaoensinoestrangeira);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const instituicoes = [
      {
        idInstituicao: 2,
        pais: 'USA',
        sigla: 'MIT'
      },
      {
        idInstituicao: 6,
        pais: 'Inglaterra',
        sigla: 'Cambridge'
      },
      {
        idInstituicao: 7,
        pais: 'Japao',
        sigla: 'UTokyo'
      },
    ]

    try {  
      await _instituicaoensinoestrangeira2.default.bulkCreate(instituicoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instituicaoensinoestrangeira', null, {})
  }
};
