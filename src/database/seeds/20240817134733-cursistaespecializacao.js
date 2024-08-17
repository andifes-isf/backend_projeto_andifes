'use strict';

import '../../database'
import CursistaEspecializacao from '../../app/models/cursistaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cursistas = [
      {
        login: "Carlos",
        idioma: "ingles",
        nivel: "C1",
        comprovante: "comprovante de proeficiencia nivel C1"
      },
      {
        login: "Pedro",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel B2"
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
