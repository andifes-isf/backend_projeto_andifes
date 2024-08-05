"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }"use strict"

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
        raca: 'branco',
        genero: 'feminino',
        nomeEmail: 'gaby',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Carlos',
        nome: 'Carlos',
        sobrenome: 'Mattos',
        DDI: 55,
        DDD: 16,
        telefone: 923486780,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'carlos',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'professorisf'
      },
      {
        login: 'Pietro',
        nome: 'Pietro',
        sobrenome: 'Minghini',
        DDI: 55,
        DDD: 16,
        telefone: 123486720,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'pietro',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'professorisf'
      },
      {
        login: 'Pedro',
        nome: 'Pedro',
        sobrenome: 'Coleone',
        DDI: 55,
        DDD: 16,
        telefone: 123486180,
        raca: 'branco',
        genero: 'masculino',
        nomeEmail: 'pedro',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'professorisf'
      }
    ]

    await _usuario2.default.bulkCreate(usuarios, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario', null, {})
  }
}
