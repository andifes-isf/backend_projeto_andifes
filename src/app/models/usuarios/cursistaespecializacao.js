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
            foreignKey: 'login'
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
            as: 'orientador'
        })
    }

    static async getMinhasTurmas(login){
        return await this.findAll({
            where: { login },
            include: {
                model: this.sequelize.models.TurmaDisciplinaEspecializacao,
                as: 'MinhaTurma',
            }
        })
    }

}

export default CursistaEspecializacao