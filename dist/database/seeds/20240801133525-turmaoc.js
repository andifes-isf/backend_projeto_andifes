"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'use strict';

require('../../database');
var _turmaoc = require('../../app/models/ofertacoletiva/turmaoc'); var _turmaoc2 = _interopRequireDefault(_turmaoc);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const turmas = [
      {
        idTurma: 1,
        idCurso: 1,
        nVagas: 50,
        nome: "2024/2_japonesbasico1_turma1",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 2,
        idCurso: 1,
        nVagas: 50,
        nome: "2024/2_japonesbasico1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 3,
        idCurso: 1,
        nVagas: 50,
        nome: "2024/2_japonesbasico1_turma3",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 4,
        idCurso: 1,
        nVagas: 50,
        nome: "2024/2_japonesbasico1_turma4",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 5,
        idCurso: 2,
        nVagas: 50,
        nome: "2024/_inglesbasico1_turma1",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 6,
        idCurso: 2,
        nVagas: 50,
        nome: "2024/_inglesbasico1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 7,
        idCurso: 2,
        nVagas: 50,
        nome: "2024/_inglesbasico1_turma3",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 8,
        idCurso: 2,
        nVagas: 50,
        nome: "2024/_inglesbasico1_turma4",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 9,
        idCurso: 3,
        nVagas: 50,
        nome: "2024/2_alemaobasico1_turma1",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 10,
        idCurso: 3,
        nVagas: 50,
        nome: "2024/2_alemaobasico1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 11,
        idCurso: 3,
        nVagas: 50,
        nome: "2024/2_alemaobasico1_turma3",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 12,
        idCurso: 3,
        nVagas: 50,
        nome: "2024/2_alemaobasico1_turma4",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 13,
        idCurso: 4,
        nVagas: 50,
        nome: "2024/2_italianobasico1_turma1",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 14,
        idCurso: 4,
        nVagas: 50,
        nome: "2024/2_italianobasico1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 15,
        idCurso: 14,
        nVagas: 50,
        nome: "2024/2_alemaointermediario1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
      {
        idTurma: 16,
        idCurso: 9,
        nVagas: 50,
        nome: "2024/2_inglesintermediario1_turma2",
        nInscritos: 30,
        nConcluintes: 20,
        nReprovados: 1
      },
    ]

    await _turmaoc2.default.bulkCreate(turmas, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('co_class', null, {})
    await queryInterface.sequelize.query('ALTER TABLE turmaoc AUTO_INCREMENT = 1')
  }
};
