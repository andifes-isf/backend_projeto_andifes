'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'RELATORIO_PRATICO',
      'orientador',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )

    await queryInterface.addConstraint(
      'RELATORIO_PRATICO', {
        fields: ['orientador'],
        type: 'foreign key',
        name: 'fk_orientador_RELATORIOPRATICO',
        references: {
          table: 'docenteorientador',
          field: 'login'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('RELATORIO_PRATICO', 'fk_orientador_RELATORIOPRATICO')

    await queryInterface.removeColumn('RELATORIO_PRATICO', 'orientador')
  }
};
