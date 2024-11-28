"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _alunodeinstituicao = require('../../app/models/usuarios/alunodeinstituicao'); var _alunodeinstituicao2 = _interopRequireDefault(_alunodeinstituicao);

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
      
      await _alunodeinstituicao2.default.bulkCreate(alunosDeInstituicao, { individualHooks: true })

    } catch (error) {
      console.log(error)
    }


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('isfstudent_institution', null, {})
  }
};
