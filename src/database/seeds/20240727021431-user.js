"use strict"

import '../../database'  // Importa para garantir que os models sejam inicializados
import Usuario from '../../app/models/usuario'

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
        tipo: 'professorisf'
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
        tipo: 'alunoisf'
      },
    ]

    await Usuario.bulkCreate(usuarios, { individualHooks: true })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario', null, {})
  }
}
