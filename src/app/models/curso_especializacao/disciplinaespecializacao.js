import Sequelize, { Model } from 'sequelize'

class DisciplinaEspecializacao extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                },
                descricao: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                eixoTematico: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                categoria: {
                    type: Sequelize.ENUM('nucleo comum', 'para todos os idiomas', 'japones', 'ingles', 'portugues', 'espanhol', 'frances', 'italiano', 'alemao'),
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'disciplinaespecializacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'nome' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models){
        this.belongsTo(models.TurmaDisciplinaEspecializacao, {
            foreignKey: 'nome'
        })

        this.hasMany(models.InteresseNaDisciplina, {
            foreignKey: 'nome'
        })
    }

}

export default DisciplinaEspecializacao