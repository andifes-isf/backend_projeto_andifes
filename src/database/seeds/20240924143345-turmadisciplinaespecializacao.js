'use strict';

import '../../database'
import TurmaDisciplinaEspecializacao from '../../app/models/curso_especializacao/turmadisciplinaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const turmas = [
      {
        disciplina: "RECURSOS E TECNOLOGIAS DIGITAIS PARA O ENSINO DE LÍNGUA INGLESA",
        nome: "Ingles1_marco",
        edital: 2024,
        mesOferta: "marco",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "INTERNACIONALIZAÇÃO, POLÍTICA LINGUÍSTICA E REDE ISF",
        edital: 2024,
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
        disciplina: "INTERNACIONALIZAÇÃO, POLÍTICA LINGUÍSTICA E REDE ISF",
        edital: 2023,
        nome: "Nucleo12_agosto",
        mesOferta: "agosto",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "MÉTODOS E INSTRUMENTOS DE AVALIAÇÃO",
        edital: 2024,
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
        disciplina: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA JAPONESA",
        edital: 2024,
        nome: "japones2_junho",
        mesOferta: "junho",
        numeroVagas: 50,
        numeroMinimoAlunos: 5,
        numeroInscritos: 30,
        numeroAprovados: 20,
        numeroDesistentes: 0,
        numeroReprovados: 1
      },
      {
        disciplina: "CERTIFICAÇÕES INTERNACIONAIS EM LÍNGUA JAPONESA",
        edital: 2023,
        nome: "japones3_junho",
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
