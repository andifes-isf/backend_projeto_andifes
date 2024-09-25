import Sequelize, { Model } from 'sequelize'

class DocenteMinistrante extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'docenteministrante',
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

export default DocenteMinistrante