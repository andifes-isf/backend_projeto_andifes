import Sequelize, { Model } from 'sequelize'

class MinistranteMinistraTurmaEspecializacao extends Model {
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
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'ministranteministraturmaespecializacao',
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

export default MinistranteMinistraTurmaEspecializacao