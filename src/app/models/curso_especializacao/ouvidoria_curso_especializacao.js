import Sequelize, { Model } from 'sequelize'

class OuvidoriaCursoEspecializacao extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                  type: Sequelize.BIGINT,
                  autoIncrement: true,
                  primaryKey: true
                },
                topico_mensagem: {
                  type: Sequelize.ENUM('orientações', 'aulas moodle', 'horas práticas', 'questões administrativas', 'outros'),
                  allowNull: false
                },
                mensagem: {
                  type: Sequelize.TEXT,
                  allowNull: false
                },
                anonimo: {
                  type: Sequelize.BOOLEAN,
                  allowNull: false
                },
                login: {
                  type: Sequelize.STRING
                },
                creation_date: {
                  type: Sequelize.DATEONLY,
                  defaultValue: Sequelize.NOW
                }
            },
            {
                sequelize,
                updatedAt: false,
                createdAt: 'creation_date',
                tableName: 'ouvidoria_curso_especializacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'id' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models){
        this.belongsTo(models.CursistaEspecializacao, {
            foreignKey: 'login',
            as: 'creator'
        })
    }

}

export default OuvidoriaCursoEspecializacao