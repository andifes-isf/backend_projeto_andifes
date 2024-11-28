'use strict';

import '../../database'
import AlunoEstrangeiro from '../../app/models/usuarios/alunoestrangeiro';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosEstrangeiro = [
      {
        home_country: "Japão",
        type: "RG",
        register: 'Comprovante do Victin',
        code: "Codigo do Victin",
        login: 'Victin'
      }
    ]

    try {
      
      await AlunoEstrangeiro.bulkCreate(alunosEstrangeiro, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('isfstudent_foreign', null, {})
  }
};
