import Sequelize, { Model } from 'sequelize'

class CoordenadorNacional extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    references: {
                        model: 'usuarios',
                        key: 'login',
                        name: 'fk_login_coordenadornacional'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'coordenadornacional',
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

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        })
    }
}

export default CoordenadorNacional