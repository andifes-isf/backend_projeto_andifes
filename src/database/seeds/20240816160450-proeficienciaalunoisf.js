'use strict';

import '../../database'
import ProeficiencieAlunoIsF from '../../app/models/proeficienciaalunoisf';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const proeficiencias = [
      {
        login: "Arata",
        idioma: "ingles",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Arata",
        idioma: "japones",
        nivel: "N4",
        comprovante: "comprovante de proeficiencia nivel N4"
      },
      {
        login: "Balla",
        idioma: "ingles",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Balla",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Bruno",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Bruno",
        idioma: "frances",
        nivel: "A1",
        comprovante: "comprovante de proeficiencia nivel A1"
      },
      {
        login: "Portix",
        idioma: "ingles",
        nivel: "C2",
        comprovante: "comprovante de proeficiencia nivel C2"
      },
      {
        login: "Portix",
        idioma: "italiano",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Guto",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
      {
        login: "Guto",
        idioma: "ingles",
        nivel: "B2",
        comprovante: "comprovante de proeficiencia nivel B2"
      },
      {
        login: "Gaby",
        idioma: "ingles",
        nivel: "A2",
        comprovante: "comprovante de proeficiencia nivel A2"
      },
      {
        login: "Gaby",
        idioma: "ingles",
        nivel: "B1",
        comprovante: "comprovante de proeficiencia nivel B1"
      },
    ]

    try {  
      await ProeficiencieAlunoIsF.bulkCreate(proeficiencias, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('proeficienciaalunoisf', null, {})
  }
};
