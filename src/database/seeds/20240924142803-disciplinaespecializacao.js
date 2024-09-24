'use strict';

import '../../database'
import DisciplinaEspecializacao from '../../app/models/curso_especializacao/disciplinaespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const disciplinas = [
      {
        nome: "Nucleo1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "nucleo comum"
      },
      {
        nome: "Nucleo2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "nucleo comum"
      },
      {
        nome: "Nucleo3",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "nucleo comum"
      },
      {
        nome: "Nucleo4",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "nucleo comum"
      },
      {
        nome: "Nucleo5",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "nucleo comum"
      },
      {
        nome: "PTOidiomas1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "para todos os idiomas"
      },
      {
        nome: "PTOidiomas2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "para todos os idiomas"
      },
      {
        nome: "PTOidiomas3",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "para todos os idiomas"
      },
      {
        nome: "japones1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "japones"
      },
      {
        nome: "japones2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "japones"
      },
      {
        nome: "ingles1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "ingles"
      },
      {
        nome: "ingles2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "ingles"
      },
      {
        nome: "portugues1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "portugues"
      },
      {
        nome: "portugues2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "portugues"
      },
      {
        nome: "espanhol1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "espanhol"
      },
      {
        nome: "espanhol2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "espanhol"
      },
      {
        nome: "frances1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "frances"
      },
      {
        nome: "frances2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "frances"
      },
      {
        nome: "italiano1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "italiano"
      },
      {
        nome: "italiano2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "italiano"
      },
      {
        nome: "alemao1",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "alemao"
      },
      {
        nome: "alemao2",
        descricao: "Descricao",
        eixoTematico: "Algo",
        categoria: "alemao"
      }
    ]

    try {  
      await DisciplinaEspecializacao.bulkCreate(disciplinas, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('disciplinaespecializacao', null, {})
  }
};
