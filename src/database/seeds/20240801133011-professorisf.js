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
        start: "2024-01-20",
        specialization_student: 0
      },
      {
        login: "Pietro",
        poca: "Certificado POCA do Pietro",
        start: "2024-01-20",
        specialization_student: 0
      },
      {
        login: "Pedro",
        poca: "Certificado POCA do Pedro",
        start: "2024-01-20",
        specialization_student: 1
      },
      {
        login: "Kactus",
        poca: "Certificado POCA da Kaory",
        start: "2024-01-20",
        specialization_student: 1
      },
    ]

    await ProfessorIsF.bulkCreate(professores, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isf_teacher', null, {})
  }
};
