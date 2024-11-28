"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict'

require('../../database');
var _alunoisf = require('../../app/models/usuarios/alunoisf'); var _alunoisf2 = _interopRequireDefault(_alunoisf);

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

    await _alunoisf2.default.bulkCreate(alunosIsF, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('isf_student', null, {})
  }
};
