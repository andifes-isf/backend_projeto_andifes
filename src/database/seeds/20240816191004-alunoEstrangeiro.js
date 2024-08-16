'use strict';

import '../../database'
import AlunoEstrangeiro from '../../app/models/alunoestrangeiro';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosEstrangeiro = [
      {
        paisOrigem: "Japão",
        tipo: "RG",
        codigo: "Codigo da Kactus",
        login: 'Kactus'
      },
      {
        paisOrigem: "Japão",
        tipo: "RG",
        codigo: "Codigo do Victin",
        login: 'Victin'
      },
      {
        paisOrigem: "Itália",
        tipo: "RG",
        codigo: "Codigo do JP",
        login: 'JP'
      },
    ]

    try {
      
      await AlunoEstrangeiro.bulkCreate(alunosEstrangeiro, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunoisfestrangeiro', null, {})
  }
};
