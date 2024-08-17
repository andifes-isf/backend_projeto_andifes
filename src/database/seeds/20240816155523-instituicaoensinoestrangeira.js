'use strict';

import '../../database'
import InstituicaoEnsino from '../../app/models/instituicaoensino';
import InstituicaoEnsinoEstrangeira from '../../app/models/instituicaoensinoestrangeira';

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
      await InstituicaoEnsinoEstrangeira.bulkCreate(instituicoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instituicaoensinoestrangeira', null, {})
  }
};
