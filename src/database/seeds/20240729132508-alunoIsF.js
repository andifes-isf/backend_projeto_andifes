'use strict'

import '../../database'
import AlunoIsF from '../../app/models/usuarios/alunoisf'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosIsF = [
      {
        login: 'Arata',
        from_institution: 1
      },
      {
        login: 'Balla',
        from_institution: 1
      },
      {
        login: 'Bruno',
        from_institution: 1
      },
      {
        login: 'Portix',
        from_institution: 1
      },
      {
        login: 'Guto',
        from_institution: 1
      },
      {
        login: 'Gaby',
        from_institution: 1
      },
      {
        login: 'Victin',
        from_institution: 0
      },
    ]

    await AlunoIsF.bulkCreate(alunosIsF, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isf_student', null, {})
  }
};
