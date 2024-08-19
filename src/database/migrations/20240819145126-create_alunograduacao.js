'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alunograduacao', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('alunograduacao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunograduacao',
      references: {
        table: 'professorisf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
