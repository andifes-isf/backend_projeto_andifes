import Sequelize, { Model } from 'sequelize'

class CoordenadorNacionalIdioma extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                language: {
                    type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                    allowNull: false
                },
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'language_national_coordinator',
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

export default CoordenadorNacionalIdioma