import Sequelize, { Model } from 'sequelize'

class AlunoIsF extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                from_institution: Sequelize.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'isf_student',
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
        this.hasOne(models.AlunoDeInstituicao, {
            foreignKey: 'login'
        })

        this.hasOne(models.AlunoEstrangeiro, {
            foreignKey: 'login'
        })

        this.belongsTo(models.Usuario, {
            foreignKey: 'login',
        })

        this.belongsToMany(models.TurmaOC, {
            through: 'isfstudent_in_occlass',
            foreignKey: 'login', 
            targetKey: 'idTurma', 
            timestamps: false
        })

        this.hasMany(models.ProeficienciaAlunoIsf, {
            foreignKey: 'login'
        })
    }
}

export default AlunoIsF