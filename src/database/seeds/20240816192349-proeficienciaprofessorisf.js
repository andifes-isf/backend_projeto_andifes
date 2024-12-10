'use strict';

import '../../database'
import ProeficienciaProfessorIsf from '../../app/models/proeficiencia/proeficienciaprofessorisf';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const proeficiencias = [
      {
        login: "Carlos",
        idioma: "ingles",
        nivel: "C1",
        comprovante: "comprovante de proeficiencia nivel C1"
      },
      {
        login: "Pietro",
        idioma: "Italiano",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Pedro",
        idioma: "frances",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Kactus",
        idioma: "japones",
        nivel: "N2",
        comprovante: "comprovante de proeficiencia nivel N2"
      }
    ]

    try {  
      await ProeficienciaProfessorIsf.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      console.log(error)
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isfteacher_proeficiency', null, {})
  }
};
