'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instituicaoensinobrasileira', {
      idInstituicao: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      CNPJ: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      sigla: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('instituicaoensinobrasileira', {
      fields: ['idInstituicao'],
      type: 'foreign key',
      name: 'fk_idInstituicao_instituicaoensinobrasileira',
      references: {
        table: 'instituicao_ensino',
        field: 'idInstituicao'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
 