import Sequelize, { Model } from 'sequelize'

class AlunoIsFParticipaTurmaOC extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  primaryKey: true
                },
                idTurma: {
                  type: Sequelize.BIGINT,
                  allowNull: false,
                  primaryKey: true
                },
                inicio: {
                  type: Sequelize.DATEONLY,
                  allowNull: false
                },
                termino: Sequelize.DATEONLY
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'alunoisfparticipaturmaoc',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login'},
                        { name: 'idTurma'}
                    ]
                }]
            }
        )

        return this
    
    }
}

export default AlunoIsFParticipaTurmaOC