"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }"use strict";'use strict';

// const path = require('path')
require('../../database');  // Importa para garantir que os models sejam inicializados
var _usuario = require('../../app/models/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = [
      {
        login: 'Arata',
        nome: 'Rafael',
        sobrenome: 'Uyeta',
        DDI: 55,
        DDD: 16,
        telefone: 123456780,
        raca: 'amarelo',
        genero: 'masculino',
        nomeEmail: 'arata',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Balla',
        nome: 'Lucas',
        sobrenome: 'Balieiro',
        DDI: 55,
        DDD: 16,
        telefone: 123456989,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'balla',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Bruno',
        nome: 'Bruno',
        sobrenome: 'Zenatti',
        DDI: 55,
        DDD: 16,
        telefone: 123456719,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'bruno',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Portix',
        nome: 'Vitor',
        sobrenome: 'Silva',
        DDI: 55,
        DDD: 16,
        telefone: 123452789,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'portix',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Guto',
        nome: 'Augusto',
        sobrenome: 'Santos',
        DDI: 55,
        DDD: 16,
        telefone: 123456589,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'guto',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Gaby',
        nome: 'Gabrielly',
        sobrenome: 'Castilho',
        DDI: 55,
        DDD: 16,
        telefone: 123486780,
        raca: 'amarelo',
        genero: 'feminino',
        nomeEmail: 'gaby',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      }
    ];

    await _usuario2.default.bulkCreate(usuarios, { individualHooks: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
