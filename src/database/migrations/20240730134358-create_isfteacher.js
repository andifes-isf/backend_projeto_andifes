'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professorisf', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      poca: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      inicio: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        primaryKey: true
      },
      termino: Sequelize.DATEONLY
    })

    await queryInterface.addConstraint('professorisf', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_professorisf',
      references: {
        table: 'usuario',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
