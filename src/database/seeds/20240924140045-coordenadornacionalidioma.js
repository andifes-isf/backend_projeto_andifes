'use strict';

import '../../database'
import CoordenadorNacionalIdioma from '../../app/models/usuarios/coordenadornacionalIdioma';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const coordenadores = [
      {
        login: "Juvenas",
        language: "ingles"
      },
      {
        login: "Yumi",
        language: "japones"
      }
    ]

    try {  
      await CoordenadorNacionalIdioma.bulkCreate(coordenadores, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('language_national_coordinator', null, {})
  }
};
