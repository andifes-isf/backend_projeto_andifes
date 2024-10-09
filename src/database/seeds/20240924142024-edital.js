'use strict';

import '..'
import EditalCursoEspecializacao from '../../app/models/curso_especializacao/editalcursoespecializacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const editais = [
      {
        ano: 2021,
        documento: "Documento do Edital de 2021",
        link: "Link para o edital",
        criador: "JP"
      },
      {
        ano: 2022,
        documento: "Documento do Edital de 2022",
        link: "Link para o edital",
        criador: "JP"
      },
      {
        ano: 2023,
        documento: "Documento do Edital de 2023",
        link: "Link para o edital",
        criador: "JP"
      },
      {
        ano: 2024,
        documento: "Documento do Edital de 2024",
        link: "Link para o edital",
        criador: "Roberto"
      },
      {
        ano: 2025,
        documento: "Documento do Edital de 2025",
        link: "Link para o edital",
        criador: "Roberto"
      },
    ]

    try {  
      await EditalCursoEspecializacao.bulkCreate(editais, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('editalcursoespecializacao', null, {})
  }
};
