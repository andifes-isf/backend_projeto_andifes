'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('turmadisciplinaespecializacao', {
      disciplina: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      edital: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      mesOferta: {
        type: Sequelize.ENUM('janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro')
      },
      numeroVagas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numeroMinimoAlunos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      numeroInscritos: {
        type: Sequelize.INTEGER
      },
      numeroDesistentes: {
        type: Sequelize.INTEGER
      },
      numeroAprovados: {
        type: Sequelize.INTEGER
      },
      numeroReprovados: {
        type: Sequelize.INTEGER
      }
    })

    await queryInterface.addIndex('turmadisciplinaespecializacao', ['nome'], {
      name: 'idx_nome_turmadisciplinaespecializacao'
    })

    await queryInterface.addConstraint('turmadisciplinaespecializacao', {
      fields: ['disciplina'],
      type: 'foreign key',
      name: 'fk_disciplina_turmadisciplinaespecializacao',
      references: {
        table: 'disciplinaespecializacao',
        field: 'nome'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
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

  down: async () => {
    // Remover a chave estrangeira
    await queryInterface.removeConstraint('turmadisciplinaespecializacao', 'fk_disciplina_turmadisciplinaespecializacao');

    // Excluir a tabela 'turmadisciplinaespecializacao'
    await queryInterface.dropTable('turmadisciplinaespecializacao');
  }
};
