'use strict';

import '../../database'
import InstituicaoEnsino from '../../app/models/instituicaoensino';
import InstituicaoEnsinoBrasileira from '../../app/models/instituicaoensinobrasileira';

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
      await InstituicaoEnsinoBrasileira.bulkCreate(instituicoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instituicaoensinobrasileira', null, {})
    await queryInterface.sequelize.query('ALTER TABLE instituicaoensino AUTO_INCREMENT = 1')
  }
};
