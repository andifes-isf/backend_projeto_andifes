'use strict';

import '../../database'
import ProfessorIsF from '../../app/models/usuarios/professorisf';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professores = [
      {
        login: "Carlos",
        poca: "Certificado POCA do Carlos",
        inicio: "2024-01-20",
        cursista: 0
      },
      {
        login: "Pietro",
        poca: "Certificado POCA do Pietro",
        inicio: "2024-01-20",
        cursista: 0
      },
      {
        login: "Pedro",
        poca: "Certificado POCA do Pedro",
        inicio: "2024-01-20",
        cursista: 1
      },
      {
        login: "Kactus",
        poca: "Certificado POCA da Kaory",
        inicio: "2024-01-20",
        cursista: 1
      },
    ]

    await ProfessorIsF.bulkCreate(professores, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isf_teacher', null, {})
  }
};
