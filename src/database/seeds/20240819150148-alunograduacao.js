'use strict';

import '../../database'
import AlunoGraduacao from '../../app/models/usuarios/alunograduacao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunos = [
      {
        login: "Yumi"
      },
      {
        login: "Enio"
      }
    ]

    try {  
      await AlunoGraduacao.bulkCreate(alunos, { individualHooks: true })
    } catch (error) {
      throw error
    }

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alunograduacao', null, {})
  }
};
