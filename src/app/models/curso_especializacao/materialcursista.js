import Sequelize, { Model } from 'sequelize'

class MaterialCursista extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                idioma: {
                    type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                nivel: {
                    type: Sequelize.CHAR(2),
                    allowNull: false
                },
                ementa: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                cargaHoraria: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'materialcursista',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'nome' },
                        { name: 'login' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models){
        this.belongsTo(models.CursistaEspecializacao, {
            foreignKey: 'login'
        })
    }

}

export default MaterialCursista