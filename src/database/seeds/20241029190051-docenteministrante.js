'use strict';

import '../../database'
import DocenteMinistrante from '../../app/models/usuarios/docenteministrante';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const docentes = [
      {
        login: "Enio"
      }
    ]

    try {  
      await DocenteMinistrante.bulkCreate(docentes, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('minister_teacher', null, {})
  }
};
