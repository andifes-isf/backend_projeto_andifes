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

    static associate(models) {
        this.hasOne(models.AlunoDeInstituicao, {
            foreignKey: 'login'
        })

        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.TurmaOC, {
            through: 'alunoisfparticipaturmaoc',
            foreignKey: 'login', 
            targetKey: 'idTurma', 
            timestamps: false
        })
    }
}

export default AlunoIsF