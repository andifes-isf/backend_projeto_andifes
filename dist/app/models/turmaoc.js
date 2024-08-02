"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class TurmaOC extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
              idTurma: {
                type: _sequelize2.default.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
              },
              idCurso: {
                type: _sequelize2.default.BIGINT,
                allowNull: false,
                primaryKey: true,
                references: {
                  model: 'curso',
                  key: 'idCurso'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
              },
              nome: {
                type: _sequelize2.default.STRING,
                allowNull: false,
                unique: true
              },
              nVagas: {
                type: _sequelize2.default.INTEGER,
                allowNull: false
              },
              nInscritos: {
                type: _sequelize2.default.INTEGER,
                validate: {
                  min: 0,
                  customValidator(value) {
                    if(value > this.nVagas) {
                      throw new Error('Quantidade de inscritos nao pode ser maior que a quantidade de vagas')
                    }
                  }
                }
              },
              nConcluintes: _sequelize2.default.INTEGER,
              nReprovados: {
                type: _sequelize2.default.INTEGER,
                validate: {
                  min: 0,
                  customValidator(value) {
                    if(value + this.nConcluintes > this.nInscritos) {
                      throw new Error('Quantidade de concluintes e reprovados não pode ser maior que a quantidade de inscritos')
                    }
                  }
                }
              },
              nEvadidos: {
                type: _sequelize2.default.VIRTUAL,
                get() {
                  return this.nInscritos - this.nConcluintes - this.nReprovados
                }
              }
            },
            {
              sequelize,
              timestamps: false,
              tableName: 'turmaoc',
              indexes: [
                  {
                  name: 'primary',
                  unique: true,
                  using: 'BTREE',
                  fields: [
                      { name: 'idTurma' },
                      { name: 'idCurso' }
                  ]
                  }
              ]
            }
        )

        return this

    }

    static associate(models) {
      this.belongsTo(models.Curso, {
        foreignKey: 'idCurso'
      })

      this.belongsToMany(models.ProfessorIsF, {
        through: 'professorisfministraturmaoc',
        foreignKey: 'idTurma',
        targetKey: 'login',
        timestamps: false
      })
    }

}

exports. default = TurmaOC