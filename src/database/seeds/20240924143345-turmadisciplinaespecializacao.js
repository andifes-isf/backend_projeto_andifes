'use strict';

import '../../database'
import TurmaDisciplinaEspecializacao from '../../app/models/curso_especializacao/turmadisciplinaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const turmas = [
      {
        disciplina: "Ingles1",
        nome: "Ingles1_marco",
        mesOferta: "marco",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "Nucleo1",
        nome: "Nucleo1_agosto",
        mesOferta: "agosto",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "PTOidiomas2",
        nome: "PTOidiomas2_setembro",
        mesOferta: "setembro",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "japones2",
        nome: "japones2_junho",
        mesOferta: "junho",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
    ]

    try {  
      await TurmaDisciplinaEspecializacao.bulkCreate(turmas, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('turmadisciplinaespecializacao', null, {})
  }
};
