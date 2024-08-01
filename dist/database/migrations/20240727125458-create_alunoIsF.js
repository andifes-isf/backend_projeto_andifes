"use strict";'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alunoisf', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'usuarios',
          key: 'login',
          name: 'fk_login_alunoisf'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      deInstituicao: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },
    {
      timestamps: false,
      indexes: [
        {
          name: "primary",
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'login' }
          ]
        }
      ]
    })
  },

  down: () => {}
};
