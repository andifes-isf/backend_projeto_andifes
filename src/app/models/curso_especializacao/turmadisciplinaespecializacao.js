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
                idTurma: {
                    type: Sequelize.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    unique: true
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
                        { name: 'idTurma' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models){
        this.belongsTo(models.DisciplinaEspecializacao, {
            foreignKey: 'nome'
        })
    }

}

export default TurmaDisciplinaEspecializacao