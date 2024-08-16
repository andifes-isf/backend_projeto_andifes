'use strict';

import '../../database'
import InstituicaoEnsino from '../../app/models/instituicaoensino';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const instituicoes = [
      {
        idInstituicao: 1,
        nome: "Universidade Federal de Minas Gerais",
        documentoVinculo: "Documento de vinculo da UFMG",
        brasileira: 1
      },
      {
        idInstituicao: 2,
        nome: "Massachusets Institute of Tecnology",
        documentoVinculo: "Documento de vinculo do MIT",
        brasileira: 0
      },
      {
        idInstituicao: 3,
        nome: "Universidade de São Paulo",
        documentoVinculo: "Documento de vinculo da USP",
        brasileira: 1
      },
      {
        idInstituicao: 4,
        nome: "Universidade Federal Tecnologica do Parana",
        documentoVinculo: "Documento de vinculo da UFTPR",
        brasileira: 1
      },
      {
        idInstituicao: 5,
        nome: "Universidade Federal de São Carlos",
        documentoVinculo: "Documento de vinculo da UFSCar",
        brasileira: 1
      },
      {
        idInstituicao: 6,
        nome: "Cambridge",
        documentoVinculo: "Documento de vinculo de Cambridge",
        brasileira: 0
      },
      {
        idInstituicao: 7,
        nome: "Tokyo University",
        documentoVinculo: "Documento de vinculo da UTokyo",
        brasileira: 0
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
