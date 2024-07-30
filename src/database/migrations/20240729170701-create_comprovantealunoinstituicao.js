'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comprovantealunoinstituicao', {
      idInstituicao: {
        type: Sequelize.BIGINT,
        references: {
          model: 'instituicaoensino',
          key: 'idInstituicao',
          name: 'fk_comprovante_instituicao'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      login: {
        type: Sequelize.STRING,
        references: {
          model: 'alunoisfdeinstituicao',
          key: 'login'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        primaryKey: true
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY,
      comprovante: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  },

  down: () => {}
};
