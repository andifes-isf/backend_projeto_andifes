import Sequelize, { Model } from "sequelize"

class CursistaEspecializacao extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                      model: 'professorisf',
                      key: 'login',
                      name: 'fk_login_cursistaespecializacao'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'cursistaespecializacao',
                indexes: [{
                    name: "primary",
                    unique: true,
                    using: 'BTREE', 
                    fields: [
                      { name: 'login' }
                    ]
                  }]
            }
        )

        return this
    }

    static associate(models) {
        this.hasMany(models.MaterialCursista, {
            foreignKey: 'login',
            as: 'material'
        })

        this.belongsTo(models.ProfessorIsF, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.TurmaDisciplinaEspecializacao, {
            through: 'cursistacursaturmaespecializacao',
            foreignKey: 'login',
            sourceKey: 'login',
            targetKey: 'nome',
            timestamps: false,
            as: 'turma'
        })

        this.belongsToMany(models.DocenteOrientador, {
            through: 'orientadororientacursista',
            foreignKey: 'loginCursista',
            sourceKey: 'login',
            targetKey: 'login',
            timestamps: false,
            as: "orientador"
        })

        this.belongsToMany(models.MaterialCursista, {
            through: 'ValidacaoMaterial',
            foreignKey: 'loginCursista',
            sourceKey: 'login',
            targetKey: 'nome',
            timestamps: false,
            as: 'validacaoMaterial'
        })

        this.hasMany(models.InteresseNaDisciplina, {
            foreignKey: 'login',
            as: 'interesse'
        })
    }
}

export default CursistaEspecializacao