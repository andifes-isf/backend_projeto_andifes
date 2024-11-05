import Sequelize, { Model } from 'sequelize'

class InstituicaoEnsinoEstrangeira extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    allowNull: false
                },
                pais: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                sigla: {
                    type: Sequelize.STRING,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensinoestrangeira',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'sigla' },
                        { name: 'pais' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models) {
        this.belongsTo(models.InstituicaoEnsino, {
            foreignKey: 'idInstituicao'
        })
    }

}

export default InstituicaoEnsinoEstrangeira