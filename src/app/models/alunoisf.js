import Sequelize, { Model } from 'sequelize'

class AlunoIsF extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    references: {
                        model: 'usuarios',
                        key: 'login',
                        name: 'fk_login_alunoisf'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                deInstituicao: Sequelize.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'alunoisf',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "login" }
                    ]
                }]
            }
        )

        return this
        
    }
}

export default AlunoIsF