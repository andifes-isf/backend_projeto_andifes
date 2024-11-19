'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.addIndex('materialcursista', ['nome'], {
        name: 'idx_nome_materialcursista'
      })

      await queryInterface.createTable('validacaomaterial', {
        nomeMaterial: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        loginCursista: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        loginOrientador: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        analisado: {
          type: Sequelize.TINYINT,
          defaultValue: false
        },
        validado: {
          type: Sequelize.TINYINT,
          defaultValue: false
        },
        feedback: {
          type: Sequelize.TEXT,
        },
        dataVerificacao: {
          type: Sequelize.DATEONLY,
        }
      }, {
        transaction: transaction
      })
  
      await queryInterface.addConstraint('validacaomaterial', {
        fields: ['loginOrientador'],
        type: 'foreign key',
        name: 'fk_loginOrientador_validacaomaterial',
        references: {
          table: 'docenteorientador',
          field: 'login'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction: transaction
      })
  
      await queryInterface.addConstraint('validacaomaterial', {
        fields: ['loginCursista'],
        type: 'foreign key',
        name: 'fk_loginCursista_validacaomaterial',
        references: {
          table: 'specialization_student',
          field: 'login'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction: transaction
      })
  
      await queryInterface.addConstraint('validacaomaterial', {
        fields: ['nomeMaterial'],
        type: 'foreign key',
        name: 'fk_nomeMaterial_validacaomaterial',
        references: {
          table: 'materialcursista',
          field: 'nome'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }, {
        transaction: transaction
      })
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('validacaomaterial', 'fk_loginorientador_validacaomaterial', null)

    await queryInterface.removeConstraint('validacaomaterial', 'fk_logincursista_validacaomaterial', null)
    
    await queryInterface.removeConstraint('validacaomaterial', 'fk_nomeMaterial_validacaomaterial', null)

    await queryInterface.removeIndex('materialcursista', 'idx_nome_materialcursista')

    return queryInterface.dropTable('validacaomaterial')
  }
};
