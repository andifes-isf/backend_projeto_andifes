import Sequelize, { Model } from 'sequelize'

class InstituicaoEnsino extends Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: Sequelize.BIGINT,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: Sequelize.STRING,
                    unique: true
                },
                documentoVinculo: Sequelize.TEXT,
                brasileira: Sequelize.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensino',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models) {
        this.belongsToMany(models.AlunoDeInstituicao, {
            through: 'comprovantealunoinstituicao',
            foreignKey: 'idInstituicao',
            targetKey: 'login',
            timestamps: false
        })
    }

}

export default InstituicaoEnsino