"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class DisciplinaEspecializacao extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true,
                },
                descricao: {
                    type: _sequelize2.default.STRING,
                    allowNull: false
                },
                eixoTematico: {
                    type: _sequelize2.default.STRING,
                    allowNull: false
                },
                categoria: {
                    type: _sequelize2.default.ENUM('nucleo comum', 'para todos os idiomas', 'japones', 'ingles', 'portugues', 'espanhol', 'frances', 'italiano', 'alemao'),
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
            foreignKey: 'nomeDisciplina'
        })
    }

}

exports. default = DisciplinaEspecializacao