import Sequelize, { Model } from 'sequelize'

class DocenteOrientador extends Model {
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
                tableName: 'advisor_teacher',
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

        this.belongsToMany(models.CursistaEspecializacao, {
            through: 'orientadororientacursista',
            foreignKey: 'loginOrientador',
            sourceKey: 'login',
            targetKey: 'login',
            as: 'mentee'
        })

        this.hasMany(models.RelatorioPratico, {
            foreignKey: 'orientador',
            as: 'materialsToAnalysis'
        })

        this.hasMany(models.GuidanceReport, {
            foreignKey: 'login',
            constraints: false,
            scope: {
                report_type: 'advisor_teacher'
            },
            as: 'GuidanceReport'
        })
    }
}

export default DocenteOrientador