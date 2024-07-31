'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [
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
        senha_encriptada: 'senha_encriptada',
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
        senha_encriptada: 'senha_encriptada',
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
        senha_encriptada: 'senha_encriptada',
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
        senha_encriptada: 'senha_encriptada',
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
        senha_encriptada: 'senha_encriptada',
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
        senha_encriptada: 'senha_encriptada',
        tipo: 'alunoisf'
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {})
  }
};
