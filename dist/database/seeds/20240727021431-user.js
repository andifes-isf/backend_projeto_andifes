"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }"use strict"

require('../../database');  // Importa para garantir que os models sejam inicializados
var _usuario = require('../../app/models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = [

      // Aluno IsF

      {
        login: 'Arata',
        name: 'Rafael',
        surname: 'Uyeta',
        DDI: 55,
        DDD: 16,
        phone: 123456780,
        ethnicity: 'amarelo',
        gender: 'masculino',
        email: 'arata',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Balla',
        name: 'Lucas',
        surname: 'Balieiro',
        DDI: 55,
        DDD: 16,
        phone: 123456989,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'balla',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Bruno',
        name: 'Bruno',
        surname: 'Zenatti',
        DDI: 55,
        DDD: 16,
        phone: 123456719,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'bruno',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Portix',
        name: 'Vitor',
        surname: 'Silva',
        DDI: 55,
        DDD: 16,
        phone: 123452789,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'portix',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Guto',
        name: 'Augusto',
        surname: 'Santos',
        DDI: 55,
        DDD: 16,
        phone: 123456589,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'guto',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Gaby',
        name: 'Gabrielly',
        surname: 'Castilho',
        DDI: 55,
        DDD: 16,
        phone: 123486780,
        ethnicity: 'branco',
        gender: 'feminino',
        email: 'gaby',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },
      {
        login: 'Victin',
        name: 'Victor',
        surname: 'Shimano',
        DDI: 55,
        DDD: 16,
        phone: 123486880,
        ethnicity: 'amarelo',
        gender: 'masculino',
        email: 'fuds',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'alunoisf'
      },

      // Professor IsF

      {
        login: 'Carlos',
        name: 'Carlos',
        surname: 'Mattos',
        DDI: 55,
        DDD: 16,
        phone: 923486780,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'carlos',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'professorisf'
      },
      {
        login: 'Pietro',
        name: 'Pietro',
        surname: 'Minghini',
        DDI: 55,
        DDD: 16,
        phone: 123486720,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'pietro',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'professorisf'
      },

      // Cursista

      {
        login: 'Pedro',
        name: 'Pedro',
        surname: 'Coleone',
        DDI: 55,
        DDD: 16,
        phone: 123486180,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'pedro',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'cursista'
      },
      {
        login: 'Kactus',
        name: 'Letícia',
        surname: 'Hata',
        DDI: 55,
        DDD: 16,
        phone: 123486080,
        ethnicity: 'amarelo',
        gender: 'feminino',
        email: 'kactus',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'Cursista'
      },

      // Coordenador Nacional

      {
        login: 'JP',
        name: 'João',
        surname: 'Silva',
        DDI: 55,
        DDD: 16,
        phone: 153486180,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'jp',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'coordenadornacional'
      },
      {
        login: 'Roberto',
        name: 'Roberto',
        surname: 'Silva',
        DDI: 55,
        DDD: 16,
        phone: 153483180,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'rob',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'coordenadornacional'
      },

      // Coordenador nacional idioma

      {
        login: 'Yumi',
        name: 'Yumi',
        surname: 'Uyeta',
        DDI: 55,
        DDD: 16,
        phone: 153489180,
        ethnicity: 'amarelo',
        gender: 'feminino',
        email: 'yu',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'coordenadornacionalidioma'
      },
      {
        login: 'Juvenas',
        name: 'Juvenaldo',
        surname: 'Silva',
        DDI: 55,
        DDD: 16,
        phone: 153489185,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'juvenas',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'coordenadornacionalidioma'
      },

      // DOCENTE MINISTRANTE

      {
        login: 'Enio',
        name: 'Enio',
        surname: 'Uyeta',
        DDI: 55,
        DDD: 16,
        phone: 153486110,
        ethnicity: 'amarelo',
        gender: 'masculino',
        email: 'enio',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'docenteministrante'
      },

      // DOCENTE ORIENTADOR

      {
        login: 'Manuel',
        name: 'Manuel',
        surname: 'Teixeira',
        DDI: 55,
        DDD: 16,
        phone: 156486110,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'manuel',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'docenteorientador'
      },
      {
        login: 'Yugo',
        name: 'Yugo',
        surname: 'Teixeira',
        DDI: 55,
        DDD: 16,
        phone: 156186110,
        ethnicity: 'branco',
        gender: 'masculino',
        email: 'yugo',
        email_domain: 'gmail.com',
        password: 'senha',
        type: 'docenteorientador'
      },
    ]

    await _usuario2.default.bulkCreate(usuarios, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {})
  }
}
