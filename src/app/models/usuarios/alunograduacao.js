import Sequelize, { Model } from "sequelize"

class AlunoGraduacao extends Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'alunograduacao',
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
        this.belongsTo(models.ProfessorIsF, {
            foreignKey: 'login'
        })
    }

}

export default AlunoGraduacao