import Sequelize, { Model } from 'sequelize'

class TurmaDisciplinaEspecializacao extends Model {
    static init(sequelize) {
        super.init(
            {
                disciplina: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                edital: {
                    type: Sequelize.CHAR(4)
                },
                nome: {
                    type: Sequelize.STRING,
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
                    type: Sequelize.INTEGER,
                    validate: {
                        min: 0,
                        customValidator(value) {
                            if(value > this.numeroVagas) {
                                throw new Error('Quantidade de inscritos nao pode ser maior que a quantidade de vagas')
                            }
                        }
                    }
                },
                numeroAprovados: {
                    type: Sequelize.INTEGER
                },
                numeroDesistentes: {
                    type: Sequelize.INTEGER,
                    validate: {
                        min: 0,
                        customValidator(value) {
                            if(value + this.numeroEvadidos + this.numeroReprovados + this.numeroAprovados > this.numeroInscritos) {
                                throw new Error('Quantidade de desistentes, reprovados, evadidos e concluintes é maior do que a quantidade de inscritos')
                            }
                        }
                    }
                },
                numeroReprovados: {
                    type: Sequelize.INTEGER
                },
                numeroEvadidos: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return this.numeroInscritos - this.numeroAprovados - this.numeroDesistentes - this.numeroReprovados
                    }
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'turmadisciplinaespecializacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'nome' },
                        { name: 'disciplina' }
                    ]
                }]
            }
        )

        // Hooks
        this.addHook('beforeSave', async (turma) => {
            turma.nome = `${turma.edital}_${turma.disciplina}_${turma.mesOferta}`
        })

        return this

    }

    static associate(models){
        this.belongsTo(models.DisciplinaEspecializacao, {
            foreignKey: 'nome'
        })

        this.belongsToMany(models.DocenteMinistrante, {
            through: 'ministranteministraturmaespecializacao',
            foreignKey: 'nomeTurma',
            sourceKey: 'nome',
            targetKey: 'login',
            timestamps: false
        })

        this.belongsToMany(models.CursistaEspecializacao, {
            through: 'cursistacursaturmaespecializacao',
            foreignKey: 'nomeTurma', 
            sourceKey: 'nome',
            targetKey: 'login',
            timestamps: false
        })
    }

}

export default TurmaDisciplinaEspecializacao