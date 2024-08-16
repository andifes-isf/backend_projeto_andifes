"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _instituicaoensino = require('../../app/models/instituicaoensino'); var _instituicaoensino2 = _interopRequireDefault(_instituicaoensino);
var _instituicaoensinobrasileira = require('../../app/models/instituicaoensinobrasileira'); var _instituicaoensinobrasileira2 = _interopRequireDefault(_instituicaoensinobrasileira);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const instituicoes = [
      {
        idInstituicao: 1,
        sigla: 'UFMG',
        CNPJ: 'CNPJ da UFMG'
      },
      {
        idInstituicao: 3,
        sigla: 'USP',
        CNPJ: 'CNPJ da USP'
      },
      {
        idInstituicao: 4,
        sigla: 'UFTPR',
        CNPJ: 'CNPJ da UFTPR'
      },
      {
        idInstituicao: 5,
        sigla: 'UFSCar',
        CNPJ: 'CNPJ da UFSCar'
      }
    ]

    try {  
      await _instituicaoensinobrasileira2.default.bulkCreate(instituicoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instituicaoensinobrasileira', null, {})
    await queryInterface.sequelize.query('ALTER TABLE instituicaoensino AUTO_INCREMENT = 1')
  }
};
