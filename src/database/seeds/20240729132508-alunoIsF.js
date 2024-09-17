'use strict'

import '../../database'
import AlunoIsF from '../../app/models/usuarios/alunoisf'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosIsF = [
      {
        login: 'Arata',
        deInstituicao: 1
      },
      {
        login: 'Balla',
        deInstituicao: 1
      },
      {
        login: 'Bruno',
        deInstituicao: 1
      },
      {
        login: 'Portix',
        deInstituicao: 1
      },
      {
        login: 'Guto',
        deInstituicao: 1
      },
      {
        login: 'Gaby',
        deInstituicao: 1
      },
      {
        login: 'Victin',
        deInstituicao: 0
      },
    ]

    await AlunoIsF.bulkCreate(alunosIsF, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alunoisf', null, {})
  }
};
