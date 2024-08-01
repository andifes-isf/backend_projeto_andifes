"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Curso extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                idCurso: {
                  type: _sequelize2.default.BIGINT,
                  autoIncrement: true,
                  allowNull: false,
                  primaryKey: true
                },
                nome: {
                  type: _sequelize2.default.STRING,
                  allowNull: false,
                  unique: true
                },
                idioma: {
                  type: _sequelize2.default.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                  allowNull: false
                },
                categoria: {
                  type: _sequelize2.default.STRING,
                  allowNull: false
                },
                nivel: {
                  type: _sequelize2.default.CHAR(2),
                  allowNull: false
                },
                cargaHoraria: {
                  type: _sequelize2.default.CHAR(2),
                  allowNull: false
                },
                ementa: {
                  type: _sequelize2.default.TEXT,
                  allowNull: false
                },
                justificativa: {
                  type: _sequelize2.default.TEXT,
                  allowNull: false
                },
                objetivos: {
                  type: _sequelize2.default.TEXT,
                  allowNull: false
                },
                metodologia: _sequelize2.default.TEXT,
                descricaoAvaliacao: _sequelize2.default.TEXT,
                aspectosFuncionais: _sequelize2.default.TEXT,
                aspectosInterculturais: _sequelize2.default.TEXT,
                aspectosLinguisticos: _sequelize2.default.TEXT
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

    static associate(models) {
      this.hasMany(models.TurmaOC, {
        foreignKey: 'idCurso'
      })
    }

}

exports. default = Curso