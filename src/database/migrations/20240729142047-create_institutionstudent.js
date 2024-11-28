'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('isfstudent_institution', {
      register_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      position: Sequelize.INTEGER,
      activity_area: {
        type: Sequelize.ENUM('ciencias exatas e da terra','ciencias biologicas','engenharia/tecnologia','ciencias da saude','ciencias agrarias','ciencias sociais','ciencias humanas','linguistica','letras e artes', 'prefiro nao dizer'),
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('isfstudent_institution', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunodeinstituicao',
      references: {
        table: 'isf_student',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
