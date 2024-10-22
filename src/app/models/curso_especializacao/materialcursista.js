import Sequelize, { Model } from 'sequelize'

class RelatorioPratico extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                idioma: {
                    type: Sequelize.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                    allowNull: false
                },
                nome: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                nivel: {
                    type: Sequelize.CHAR(2),
                    allowNull: false
                },
                descricao: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                cargaHoraria: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                orientador: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
                link_portfolio: {
                    type: Sequelize.TEXT,
                    allowNull: false
                },
                categoria: {
                    type: Sequelize.ENUM('preparacao do curso', 'preparacao material didatico', 'preparacao de atividades', 'preparacao de aulas', 'preparacao de oficinas', 'preparacao de testes de nivelamento'),
                    allowNull: false
                },
                data_avaliacao: {
                    type: Sequelize.DATEONLY
                },
                feedback: {
                    type: Sequelize.TEXT
                },
                visualizado_pelo_cursista: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'relatorio_pratico',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'nome' },
                        { name: 'login' }
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

        this.belongsToMany(models.CursistaEspecializacao, {
            through: 'ValidacaoMaterial',
            foreignKey: 'nomeMaterial',
            sourceKey: 'nome',
            targetKey: 'login',
            as: 'criador'
        })

        this.belongsToMany(models.DocenteOrientador, {
            through: 'ValidacaoMaterial',
            foreignKey: 'nomeMaterial',
            sourceKey: 'nome',
            targetKey: 'login',
            as: 'validador'
        })
    }

}

export default MaterialCursista