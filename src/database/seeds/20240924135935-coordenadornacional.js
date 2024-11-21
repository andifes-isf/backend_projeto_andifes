'use strict';

import '../../database'
import CoordenadorNacional from '../../app/models/usuarios/coordenadornacional';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coordenadores = [
      {
        login: "JP"
      },
      {
        login: "Roberto"
      }
    ]

    try {  
      await CoordenadorNacional.bulkCreate(coordenadores, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('national_coordinator', null, {})
  }
};
