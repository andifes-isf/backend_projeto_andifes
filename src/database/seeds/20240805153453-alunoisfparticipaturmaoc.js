'use strict';

import '../../database'
import AlunoIsFParticipaTurmaOC from '../../app/models/ofertacoletiva/alunoisfparticipaturmaoc';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const relacoes = [
      {
        login: "Arata",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Balla",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Bruno",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Portix",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Guto",
        idTurma: 1,
        inicio: "2021-04-20",
      },
      {
        login: "Gaby",
        idTurma: 1,
        inicio: "2021-04-20",
      },
    ]

    await AlunoIsFParticipaTurmaOC.bulkCreate(relacoes, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alunoisfparticipaturmaoc', null, {})
  }
};
