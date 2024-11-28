'use strict';

import '../../database'
import AlunoDeInstituicao from '../../app/models/usuarios/alunodeinstituicao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosDeInstituicao = [
      {
        register_number: 'DocumentoArata',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Arata'
      },
      {
        register_number: 'DocumentoBalla',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Balla'
      },
      {
        register_number: 'DocumentoBruno',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Bruno'
      },
      {
        register_number: 'DocumentoPortix',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Portix'
      },
      {
        register_number: 'DocumentoGuto',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Guto'
      },
      {
        register_number: 'DocumentoGaby',
        position: 1,
        activity_area: 'engenharia/tecnologia',
        login: 'Gaby'
      }
    ]

    try {
      
      await AlunoDeInstituicao.bulkCreate(alunosDeInstituicao, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('isfstudent_institution', null, {})
  }
};
