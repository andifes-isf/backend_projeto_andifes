import Sequelize, { Model } from "sequelize"

class TurmaOC extends Model {
    static init (sequelize) {
        super.init(
            {
              idTurma: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
              },
              idCurso: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
              },
              nome: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
              },
              nVagas: {
                type: Sequelize.INTEGER,
                allowNull: false
              },
              nInscritos: {
                type: Sequelize.INTEGER,
                validate: {
                  min: 0,
                  customValidator(value) {
                    if(value > this.nVagas) {
                      throw new Error('Quantidade de inscritos nao pode ser maior que a quantidade de vagas')
                    }
                  }
                }
              },
              nConcluintes: Sequelize.INTEGER,
              nReprovados: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.VIRTUAL,
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

      this.belongsToMany(models.AlunoIsF, {
        through: 'alunoisfparticipaturmaoc',
        foreignKey: 'idTurma',
        sourceKey: 'idTurma',
        timestamps: false
      })
    }

}

export default TurmaOC