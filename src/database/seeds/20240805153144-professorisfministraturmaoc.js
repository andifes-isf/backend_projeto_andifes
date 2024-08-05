'use strict';

import '../../database'
import ProfessorIsFMinistraTurmaOC from '../../app/models/professorisfministraturmaoc';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const relacoes = [
      {
        login: "Carlos",
        idTurma: 1,
        inicio: "2020-11-10"
      },
      {
        login: "Carlos",
        idTurma: 2,
        inicio: "2020-11-10"
      },
      {
        login: "Pietro",
        idTurma: 3,
        inicio: "2020-11-10"
      },
      {
        login: "Pietro",
        idTurma: 4,
        inicio: "2020-11-10"
      },
      {
        login: "Pedro",
        idTurma: 6,
        inicio: "2020-11-10"
      },
      {
        login: "Pedro",
        idTurma: 5,
        inicio: "2020-11-10"
      },
    ]

    await ProfessorIsFMinistraTurmaOC.bulkCreate(relacoes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('professorisfministraturmaoc', null, {})
  }
};
