'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('professorisf', {
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'usuarios',
          key: 'login',
          name: 'fk_login_professorisf'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
      fim: Sequelize.DATEONLY
    },
  {
    timestamps: false,
    indexes: [
      {
        name: "primary",
        unique: true,
        using: 'BTREE', 
        fields: [
          { name: 'login' },
          { name: 'inicio'}
        ]
      }
    ]
  })
  },

  down: () => {}
};
