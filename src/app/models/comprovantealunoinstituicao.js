import Sequelize, { Model } from 'sequelize'

class ComprovanteAlunoInstituicao extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    references: {
                      model: 'instituicaoensino',
                      key: 'idInstituicao',
                      name: 'fk_comprovante_instituicao'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                    primaryKey: true
                  },
                login: {
                    type: Sequelize.STRING,
                    references: {
                        model: 'alunoisfdeinstituicao',
                        key: 'login'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                    primaryKey: true
                },
                inicio: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isBeforeToday(value) {
                            const today = new Date().toISOString().split('T')[0]
                            if(value > today) {
                                throw new Error('A data de inicio nao pode ser posterior a data de hoje')
                            }
                        }
                    }
                },
                termino: {
                    type: Sequelize.DATEONLY,
                    validate: {
                        isBeforeBegin(value) {
                            if(this.inicio > value) {
                                throw new Error('A data de termino nao pode ser anterior a data de inicio')
                            }
                        }
                    }
                },
                comprovante: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'comprovantealunoinstituicao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login'},
                        { name: 'idInstituicao'},
                        { name: 'inicio'}
                    ]
                }]
            }
        )

        return this
    
    }
}

export default ComprovanteAlunoInstituicao