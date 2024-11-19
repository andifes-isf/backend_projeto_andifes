import Sequelize, { Model } from 'sequelize'

class ComprovanteAlunoInstituicao extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    references: {
                      model: 'instituicao_ensino',
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
                        model: 'aluno_isf_instituicao',
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
                        isBefore: {
                            args: new Date().toISOString(), // Data atual no formato ISO
                            msg: 'A data de inicio deve ser anterior à data atual.',
                          },
                    }
                },
                termino: {
                    type: Sequelize.DATEONLY,
                    validate: {
                        isAfterBegin(value) {
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
                tableName: 'comprovante_aluno_instituicao',
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