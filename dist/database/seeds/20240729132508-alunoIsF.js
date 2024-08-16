"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

require('../../database');
var _alunoisf = require('../../app/models/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);

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
        login: 'Kactus',
        deInstituicao: 0
      },
      {
        login: 'Victin',
        deInstituicao: 0
      },
      {
        login: 'JP',
        deInstituicao: 1
      },
    ]

    await _alunoisf2.default.bulkCreate(alunosIsF, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('alunoisf', null, {})
  }
};
