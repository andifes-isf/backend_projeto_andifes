import Sequelize, { Model } from 'sequelize'

class GuidanceReport extends Model {
    static init (sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },
                workload: {
                    type: Sequelize.INTEGER, 
                    allowNull: false
                },
                note: {
                    type: Sequelize.STRING
                } ,
                login: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.fn('NOW')
                },
                report_type: {
                    type: Sequelize.ENUM('advisor_teacher', 'specialization_student'),
                    allowNull: false
                }
            },
            {
                sequelize,
                updatedAt: false,
                tableName: 'guidance_report',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "id" }
                    ]
                }]
            }
        )

        return this
        
    }

    static associate(models){
        this.hasMany(models.InteresseNaDisciplina, {
            foreignKey: 'ano'
        })

        this.belongsTo(models.CursistaEspecializacao, {
            foreignKey: 'login',
            constraints: false,
            as: 'specializationStudent',
            scope: {
                report_type: 'specialization_student'
            }
        })

        this.belongsTo(models.DocenteOrientador, {
            foreignKey: 'login',
            constraints: false,
            as: 'advisorTeacher'
        })
    }

}

export default GuidanceReport