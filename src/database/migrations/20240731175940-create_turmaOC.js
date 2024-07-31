'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('turmaoc', {
      idTurma: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      idCurso: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'curso',
          key: 'idCurso'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      nVagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nInscritos: Sequelize.INTEGER,
      nConcluintes: Sequelize.INTEGER,
      nReprovados: Sequelize.INTEGER,
    },
    {
      timestamps: false,
      indexes: [
        {
          name: 'primary',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'idTurma' },
            { name: 'idCurso' }
          ]
        }
      ]
    })
  },

  down: () => {}
};
