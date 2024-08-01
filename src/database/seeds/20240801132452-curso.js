'use strict';

import '../../database'
import Curso from '../../app/models/curso';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cursos = [
      {
        nome: "Japonês básico 1",
        idioma: "Japonês",
        categoria: "dia a dia",
        nivel: "N5",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Inglês básico 1",
        idioma: "Inglês",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "30",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Alemão básico 1",
        idioma: "Alemão",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Italiano básico 1",
        idioma: "Italiano",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Espanhol básico 1",
        idioma: "Espanhol",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Português básico 1",
        idioma: "Português",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      },
      {
        nome: "Francês básico 1",
        idioma: "Francês",
        categoria: "dia a dia",
        nivel: "C1",
        cargaHoraria: "12",
        ementa: "req.body.ementa",
        justificativa: "req.body.justificativa",
        objetivos: "req.body.objetivos",
        metodologia: "req.body.metodologia",
        descricaoAvaliacao: "req.body.descricaoAvaliacao",
        aspectosFuncionais: "req.body.aspectosFuncionais",
        aspectosInterculturais: "req.body.aspectosInterculturais",
        aspectosLinguisticos: "req.body.aspectosLinguisticos"
      }
    ]

    await Curso.bulkCreate(cursos, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('curso', null, {})
    await queryInterface.sequelize.query('ALTER TABLE curso AUTO_INCREMENT = 1')
  }
};
