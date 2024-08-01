'use strict';

import '../../database'
import InstituicaoEnsino from '../../app/models/instituicaoensino';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const instituicoes = [
      {
        nome: "Universidade Federal de Minas Gerais",
        documentoVinculo: "Documento de vinculo da UFMG",
        brasileira: 1
      },
      {
        nome: "Universidade Federal de São Carlos",
        documentoVinculo: "Documento de vinculo da UFSCar",
        brasileira: 1
      },
      {
        nome: "Universidade de São Paulo",
        documentoVinculo: "Documento de vinculo da USP",
        brasileira: 1
      },
      {
        nome: "Universidade Federal Tecnologica do Parana",
        documentoVinculo: "Documento de vinculo da UFTPR",
        brasileira: 1
      },
    ]

    try {  
      await InstituicaoEnsino.bulkCreate(instituicoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('instituicaoensino', null, {})
    await queryInterface.sequelize.query('ALTER TABLE instituicaoensino AUTO_INCREMENT = 1')
  }
};
