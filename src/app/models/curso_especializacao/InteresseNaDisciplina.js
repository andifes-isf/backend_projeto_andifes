import Sequelize, { Model } from 'sequelize'

class InteresseNaDisciplina extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                nomeDisciplina: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                preferencia: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ano: {
                    type: Sequelize.CHAR(4),
                    allowNull: false,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'interessenadisciplina',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "login" },
                        { name: "preferencia" },
                        { name: "ano" }
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

        this.belongsTo(models.DisciplinaEspecializacao, {
            foreignKey: 'nomeDisciplina'
        })

        this.belongsTo(models.EditalCursoEspecializacao, {
            foreignKey: 'ano'
        })
    }

}

export default InteresseNaDisciplina