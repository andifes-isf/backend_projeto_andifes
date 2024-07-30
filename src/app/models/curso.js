import Sequelize, { Model } from "sequelize";

class Curso extends Model {
    static init (sequelize) {
        super.init(
            {
                idCurso: {
                  type: Sequelize.BIGINT,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true
                },
                nome: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  unique: true
                },
                idioma: {
                  type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                  allowNull: false
                },
                categoria: {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                nivel: {
                  type: Sequelize.CHAR(2),
                  allowNull: false
                },
                cargaHoraria: {
                  type: Sequelize.CHAR(2),
                  allowNull: false
                },
                ementa: {
                  type: Sequelize.TEXT,
                  allowNull: false
                },
                justificativa: {
                  type: Sequelize.TEXT,
                  allowNull: false
                },
                objetivos: {
                  type: Sequelize.TEXT,
                  allowNull: false
                },
                metodologia: Sequelize.TEXT,
                descricaoAvaliacao: Sequelize.TEXT,
                aspectosFuncionais: Sequelize.TEXT,
                aspectosInterculturais: Sequelize.TEXT,
                aspectosLinguisticos: Sequelize.TEXT
              },
              {
                sequelize,
                timestamps: false,
                tableName: 'curso',
                indexes: [
                  {
                    name: 'primary',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                      { name: 'idCurso'}
                    ]
                  }
                ]
              }
        )

        return this

    }
}

export default Curso