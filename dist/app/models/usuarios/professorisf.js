"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProfessorIsF extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                      model: 'usuarios',
                      key: 'login',
                      name: 'fk_login_professorisf'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                poca: {
                    type: _sequelize2.default.TEXT,
                    allowNull: false
                },
                inicio: {
                    type: _sequelize2.default.DATEONLY,
                    allowNull: false,
                    primaryKey: true,
                    validate: {
                        isBeforeToday(value) {
                            const today = new Date().toISOString().split('T')[0]
                            if(value > today) {
                                throw new Error('A data de inicio nao pode ser posterior a data de hoje')
                            }
                        }
                    }
                },
                termino: {
                    type: _sequelize2.default.DATEONLY,
                    validate: {
                        isBeforeBegin(value) {
                            if(this.inicio > value) {
                                throw new Error('A data de termino nao pode ser anterior a data de inicio')
                            }
                        }
                    }
                },
                cursista: {
                    type: _sequelize2.default.BOOLEAN,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'professor_isf',
                indexes: [{
                    name: "primary",
                    unique: true,
                    using: 'BTREE', 
                    fields: [
                      { name: 'login' },
                      { name: 'inicio'}
                    ]
                  }]
            }
        )

        return this
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        })

        this.hasOne(models.CursistaEspecializacao, {
            foreignKey: 'login'
        })

        this.hasOne(models.AlunoGraduacao, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.TurmaOC, {
            through: 'isfteacher_ministre_occlass',
            foreignKey: 'login',
            sourceKey: 'login',
            timestamps: false
        })

        this.belongsToMany(models.InstituicaoEnsino, {
            through: 'teacher_institution_register', 
            foreignKey: 'login',
            targetKey: 'idInstituicao',
            timestamps: false
        })

        this.hasMany(models.ProeficienciaProfessorIsF, {
            foreignKey: 'login'
        })
    }

}

exports. default = ProfessorIsF