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
      },
      termino: Sequelize.DATEONLY
    })

    await queryInterface.addConstraint('professorisf', {
      fields: ['login', 'inicio'],
      type: 'unique',
      name: 'unique_login_inicio_professorisf'
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
