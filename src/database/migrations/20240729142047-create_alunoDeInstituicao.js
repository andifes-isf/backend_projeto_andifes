'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('aluno_isf_instituicao', {
      nDocumento: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      cargo: Sequelize.INTEGER,
      areaAtuacao: {
        type: Sequelize.ENUM('ciencias exatas e da terra','ciencias biologicas','engenharia/tecnologia','ciencias da saude','ciencias agrarias','ciencias sociais','ciencias humanas','linguistica','letras e artes', 'prefiro nao dizer'),
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      }
    })

    await queryInterface.addConstraint('aluno_isf_instituicao', {
      fields: ['login'],
      type: 'foreign key',
      name: 'fk_login_alunodeinstituicao',
      references: {
        table: 'aluno_isf',
        field: 'login'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

  },

  down: () => {}
};
