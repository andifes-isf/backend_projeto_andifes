"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoIsF extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                },
                deInstituicao: _sequelize2.default.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'aluno_isf',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "login" }
                    ]
                }]
            }
        )

        return this
        
    }

    static associate(models) {
        this.hasOne(models.AlunoDeInstituicao, {
            foreignKey: 'login'
        })

        this.hasOne(models.AlunoEstrangeiro, {
            foreignKey: 'login'
        })

        this.belongsTo(models.Usuario, {
            foreignKey: 'login',
        })

        this.belongsToMany(models.TurmaOC, {
            through: 'isfstudent_in_occlass',
            foreignKey: 'login', 
            targetKey: 'idTurma', 
            timestamps: false
        })

        this.hasMany(models.ProeficienciaAlunoIsf, {
            foreignKey: 'login'
        })
    }
}

exports. default = AlunoIsF