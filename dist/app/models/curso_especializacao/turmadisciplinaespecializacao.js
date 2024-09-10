"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class TurmaDisciplinaEspecializacao extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                nome: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                idTurma: {
                    type: _sequelize2.default.BIGINT,
                    allowNull: false,
                    primaryKey: true
                },
                mesOferta: {
                    type: _sequelize2.default.ENUM('janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro')
                },
                numeroVagas: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false
                },
                numeroMinimoAlunos: {
                    type: _sequelize2.default.INTEGER,
                    allowNull: false
                },
                numeroInscritos: {
                    type: _sequelize2.default.INTEGER,
                    validate: {
                        min: 0,
                        customValidator(value) {
                            if(value > this.numeroVagas) {
                                throw new Error('Quantidade de inscritos nao pode ser maior que a quantidade de vagas')
                            }
                        }
                    }
                },
                numeroAprovados: {
                    type: _sequelize2.default.INTEGER
                },
                numeroDesistentes: {
                    type: _sequelize2.default.INTEGER,
                    validate: {
                        min: 0,
                        customValidator(value) {
                            if(value + this.numeroEvadidos + this.numeroReprovados + this.numeroAprovados > this.numeroInscritos) {
                                throw new Error('Quantidade de desistente, reprovador, evadidos e concluintes é maior do que a quantidade de inscritos')
                            }
                        }
                    }
                },
                numeroReprovados: {
                    type: _sequelize2.default.INTEGER
                },
                numeroEvadidos: {
                    type: _sequelize2.default.VIRTUAL,
                    get() {
                        return this.numeroInscritos - this.numeroAprovados - this.numeroDesistentes - this.numeroReprovados
                    }
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'turmadisciplinaespecializacao',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'nome' },
                        { name: 'idTurma' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models){
        this.belongsTo(models.DisciplinaEspecializacao, {
            foreignKey: 'nome'
        })
    }

}

exports. default = TurmaDisciplinaEspecializacao