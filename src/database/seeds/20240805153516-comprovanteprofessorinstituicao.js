'use strict';

import '../../database'
import ComprovanteProfessorInstituicao from '../../app/models/comprovanteprofessorinstituicao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comprovantes = [
      {
        login: "Pedro",
        idInstituicao: 2,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Pedro na UFSCar"
      },
      {
        login: "Carlos",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Carlos na UFMG"
      },
      {
        login: "Pietro",
        idInstituicao: 1,
        inicio: "2021-04-20",
        comprovante: "Comprovante de Pietro na UFSCar"
      }
    ]

    await ComprovanteProfessorInstituicao.bulkCreate(comprovantes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comprovanteprofessorinstituicao', null, {})
  }
};
