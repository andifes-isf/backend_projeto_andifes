"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoIsF extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true,
                    references: {
                        model: 'usuarios',
                        key: 'login',
                        name: 'fk_login_alunoisf'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                deInstituicao: _sequelize2.default.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'alunoisf',
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

        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        })
    }
}

exports. default = AlunoIsF