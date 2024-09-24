"use strict"

import '../../database'  // Importa para garantir que os models sejam inicializados
import Usuario from '../../app/models/usuarios/usuario'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarios = [

      // Aluno IsF

      {
        login: 'Arata',
        nome: 'Rafael',
        sobrenome: 'Uyeta',
        DDI: 55,
        DDD: 16,
        telefone: 123456780,
        etnia: 'amarelo',
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
        etnia: 'branco',
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
        etnia: 'branco',
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
        etnia: 'branco',
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
        etnia: 'branco',
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
        etnia: 'branco',
        genero: 'feminino',
        nomeEmail: 'gaby',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },
      {
        login: 'Victin',
        nome: 'Victor',
        sobrenome: 'Shimano',
        DDI: 55,
        DDD: 16,
        telefone: 123486880,
        etnia: 'amarelo',
        genero: 'masculino',
        nomeEmail: 'fuds',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'alunoisf'
      },

      // Professor IsF

      {
        login: 'Carlos',
        nome: 'Carlos',
        sobrenome: 'Mattos',
        DDI: 55,
        DDD: 16,
        telefone: 923486780,
        etnia: 'branco',
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
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'pietro',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'professorisf'
      },

      // Cursista

      {
        login: 'Pedro',
        nome: 'Pedro',
        sobrenome: 'Coleone',
        DDI: 55,
        DDD: 16,
        telefone: 123486180,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'pedro',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'cursista'
      },
      {
        login: 'Kactus',
        nome: 'Letícia',
        sobrenome: 'Hata',
        DDI: 55,
        DDD: 16,
        telefone: 123486080,
        etnia: 'amarelo',
        genero: 'feminino',
        nomeEmail: 'kactus',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'Cursista'
      },

      // Coordenador Nacional

      {
        login: 'JP',
        nome: 'João',
        sobrenome: 'Silva',
        DDI: 55,
        DDD: 16,
        telefone: 153486180,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'jp',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'coordenadornacional'
      },
      {
        login: 'Roberto',
        nome: 'Roberto',
        sobrenome: 'Silva',
        DDI: 55,
        DDD: 16,
        telefone: 153483180,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'rob',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'coordenadornacional'
      },

      // Coordenador nacional idioma

      {
        login: 'Yumi',
        nome: 'Yumi',
        sobrenome: 'Uyeta',
        DDI: 55,
        DDD: 16,
        telefone: 153489180,
        etnia: 'amarelo',
        genero: 'feminino',
        nomeEmail: 'yu',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'coordenadornacionalidioma'
      },
      {
        login: 'Juvenas',
        nome: 'Juvenaldo',
        sobrenome: 'Silva',
        DDI: 55,
        DDD: 16,
        telefone: 153489185,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'juvenas',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'coordenadornacionalidioma'
      },

      // DOCENTE MINISTRANTE

      {
        login: 'Enio',
        nome: 'Enio',
        sobrenome: 'Uyeta',
        DDI: 55,
        DDD: 16,
        telefone: 153486110,
        etnia: 'amarelo',
        genero: 'masculino',
        nomeEmail: 'enio',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'docenteministrante'
      },

      // DOCENTE ORIENTADOR

      {
        login: 'Manuel',
        nome: 'Manuel',
        sobrenome: 'Teixeira',
        DDI: 55,
        DDD: 16,
        telefone: 156486110,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'manuel',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'docenteorientador'
      },
      {
        login: 'Yugo',
        nome: 'Yugo',
        sobrenome: 'Teixeira',
        DDI: 55,
        DDD: 16,
        telefone: 156186110,
        etnia: 'branco',
        genero: 'masculino',
        nomeEmail: 'yugo',
        dominio: 'gmail.com',
        senha: 'senha',
        tipo: 'docenteorientador'
      },
    ]

    await Usuario.bulkCreate(usuarios, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario', null, {})
  }
}
