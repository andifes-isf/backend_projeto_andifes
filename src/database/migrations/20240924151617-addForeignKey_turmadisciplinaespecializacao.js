'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('turmadisciplinaespecializacao', 'edital', {
      type: Sequelize.CHAR(4)
    })

    await queryInterface.addConstraint('turmadisciplinaespecializacao', {
      fields: ['edital'],
      type: 'foreign key',
      name: 'fk_edital_turmadisciplinaespecializacao',
      references: {
        table: 'editalcursoespecializacao',
        field: 'ano'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('turmadisciplinaespecializacao', 'fk_edital_turmadisciplinaespecializacao', null)
    
    await queryInterface.removeColumn('turmadisciplinaespecializacao', 'edital', null)
  }
};
