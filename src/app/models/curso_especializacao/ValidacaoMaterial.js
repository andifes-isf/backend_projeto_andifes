import Sequelize, { Model } from 'sequelize'

class ValidacaoMaterial extends Model {
    static init(sequelize) {
        super.init(
            {
                nomeMaterial: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                loginCursista: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                loginOrientador: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                analisado: {
                    type: Sequelize.TINYINT,
                    defaultValue: false
                },
                validado: {
                    type: Sequelize.TINYINT,
                    defaultValue: false
                },
                feedback: {
                    type: Sequelize.TEXT,
                },
                dataVerificacao: {
                    type: Sequelize.DATEONLY,
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'validacaomaterial',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'loginOrientador' },
                        { name: 'loginCursista' },
                        { name: 'nomeMaterial' }
                    ]
                }]
            }
        )

        return this

    }
}

export default ValidacaoMaterial