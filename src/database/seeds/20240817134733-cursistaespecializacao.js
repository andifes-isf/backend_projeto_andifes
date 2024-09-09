'use strict';

import '../../database'
import CursistaEspecializacao from '../../app/models/usuarios/cursistaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cursistas = [
      {
        login: "Carlos"
      },
      {
        login: "Pedro"
      },
      {
        login: "Pietro"
      }
    ]

    try {  
      await CursistaEspecializacao.bulkCreate(cursistas, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cursistaespecializacao', null, {})
  }
};
