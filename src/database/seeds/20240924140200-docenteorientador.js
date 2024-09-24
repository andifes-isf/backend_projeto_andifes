'use strict';

import '../../database'
import DocenteOrientador from '../../app/models/usuarios/docenteorientador';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const docentes = [
      {
        login: "Manuel"
      },
      {
        login: "Yugo"
      }
    ]

    try {  
      await DocenteOrientador.bulkCreate(docentes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('docenteorientador', null, {})
  }
};
