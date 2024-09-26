import Sequelize, { Model } from 'sequelize'

class CursistaCursaTurmaEspecializacao extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                },
                nomeTurma: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                status: {
                    type: Sequelize.ENUM('nao iniciado', 'em andamento', 'aprovado', 'reprovado', 'desistente', 'evadido'),
                    allowNull: false,
                    defaultValue: 'nao iniciado'
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'cursistacursaturmaespecializacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' },
                        { name: 'nomeTurma' }
                    ]
                }]
            }
        )

        return this

    }
}

export default CursistaCursaTurmaEspecializacao