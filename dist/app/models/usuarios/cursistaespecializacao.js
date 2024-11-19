"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class CursistaEspecializacao extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true
                },
                horas_praticas: {
                    type: _sequelize2.default.INTEGER,
                    defaultValue: 0
                },
                horas_NC: {
                    type: _sequelize2.default.INTEGER,
                    defaultValue: 0
                },
                horas_CCTI: {
                    type: _sequelize2.default.INTEGER,
                    defaultValue: 0
                },
                horas_CCIP: {
                    type: _sequelize2.default.INTEGER,
                    defaultValue: 0
                },
                horas_CCI: {
                    type: _sequelize2.default.INTEGER,
                    defaultValue: 0
                },
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'cursista_especializacao',
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
        this.hasMany(models.RelatorioPratico, {
            foreignKey: 'login',
            as: 'material'
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
            as: "orientador"
        })

        this.hasMany(models.InteresseNaDisciplina, {
            foreignKey: 'login',
            as: 'interesse'
        })

        this.hasOne(models.OuvidoriaCursoEspecializacao, {
            foreignKey: 'login',
            as: 'reclamation'
        })
    }
}

exports. default = CursistaEspecializacao