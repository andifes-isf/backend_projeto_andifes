'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('professor_isf', {
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
      termino: Sequelize.DATEONLY,
      cursista: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })

    await queryInterface.addConstraint('professor_isf', {
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
