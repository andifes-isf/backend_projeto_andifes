import Sequelize, { Model } from 'sequelize'

class InstituicaoEnsinoBrasileira extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    allowNull: false
                },
                CNPJ: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                sigla: {
                    type: Sequelize.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensinobrasileira',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'CNPJ' }
                    ]
                }]
            }
        )

        return this

    }
}

export default InstituicaoEnsinoBrasileira