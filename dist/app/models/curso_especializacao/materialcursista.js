"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class RelatorioPratico extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                },
                idioma: {
                    type: _sequelize2.default.ENUM('ingles', 'portuges', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
                    allowNull: false
                },
                nome: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                nivel: {
                    type: _sequelize2.default.CHAR(2),
                    allowNull: false
                },
                descricao: {
                    type: _sequelize2.default.TEXT,
                    allowNull: false,
                },
                cargaHoraria: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false,
                },
                orientador: {
                    type: _sequelize2.default.STRING,
                    allowNull: false
                },
                link_portfolio: {
                    type: _sequelize2.default.TEXT,
                    allowNull: false
                },
                categoria: {
                    type: _sequelize2.default.ENUM('preparacao do curso', 'preparacao material didatico', 'preparacao de atividades', 'preparacao de aulas', 'preparacao de oficinas', 'preparacao de testes de nivelamento'),
                    allowNull: false
                },
                data_avaliacao: {
                    type: _sequelize2.default.DATEONLY
                },
                feedback: {
                    type: _sequelize2.default.TEXT
                },
                visualizado_pelo_cursista: {
                    type: _sequelize2.default.BOOLEAN,
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

exports. default = MaterialCursista