'use strict';

import '..'
import OrientadorOrientaCursista from '../../app/models/curso_especializacao/OrientadorOrientaCursista';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orientacoes = [
      {
        loginOrientador: "Yugo",
        loginCursista: "Kactus",
        status: "ativo",
        inicio: "2024-04-04"
      },
      {
        loginOrientador: "Manuel",
        loginCursista: "Pedro",
        status: "ativo",
        inicio: "2024-04-04"
      },
    ]

    try {  
      await OrientadorOrientaCursista.bulkCreate(orientacoes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orientadororientacursista', null, {})
  }
};
