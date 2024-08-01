"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _alunodeinstituicao = require('../../app/models/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);

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
      
      await _alunodeinstituicao2.default.bulkCreate(alunosDeInstituicao, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alunoisfdeinstituicao', null, {})
  }
};
