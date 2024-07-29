'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('alunoisfdeinstituicao', {
      nDocumento: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      cargo: Sequelize.INTEGER,
      areaAtuacao: {
        type: Sequelize.ENUM('ciencias exatas e da terra','ciencias biologicas','engenharia/tecnologia','ciencias da saude','ciencias agrarias','ciencias sociais','ciencias humanas','linguistica','letras e artes', 'prefiro nao dizer'),
        allowNull: false
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'alunoisf',
          key: 'login'
        },
        unique: true
      }
    })  
  },

  down: () => {}
};
