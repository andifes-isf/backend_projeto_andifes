'use strict';

import '../../database'
import AlunoDeInstituicao from '../../app/models/usuarios/alunodeinstituicao';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const alunosDeInstituicao = [
      {
        nDocumento: 'DocumentoArata',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
        login: 'Arata'
      },
      {
        nDocumento: 'DocumentoBalla',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
        login: 'Balla'
      },
      {
        nDocumento: 'DocumentoBruno',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
        login: 'Bruno'
      },
      {
        nDocumento: 'DocumentoPortix',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
        login: 'Portix'
      },
      {
        nDocumento: 'DocumentoGuto',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
        login: 'Guto'
      },
      {
        nDocumento: 'DocumentoGaby',
        cargo: 1,
        areaAtuacao: 'engenharia/tecnologia',
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
    await queryInterface.bulkDelete('aluno_isf_instituicao', null, {})
  }
};
