'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('instituicaoensinoestrangeira', {
      idInstituicao: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      pais: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      sigla: {
        type: Sequelize.STRING,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('instituicaoensinoestrangeira', {
      fields: ['idInstituicao'],
      type: 'foreign key',
      name: 'fk_idInstituicao_instituicaoensinoestrangeira',
      references: {
        table: 'instituicaoensino',
        field: 'idInstituicao'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: () => {}
};
 