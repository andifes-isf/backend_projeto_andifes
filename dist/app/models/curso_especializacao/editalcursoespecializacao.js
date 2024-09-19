"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class EditalCursoEspecializacao extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                ano: {
                    type: _sequelize2.default.CHAR(4),
                    primaryKey: true
                },
                documento: {
                    type: _sequelize2.default.TEXT,
                    allowNull: false
                },
                link: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                },
                listaAprovados: {
                    type: _sequelize2.default.TEXT,
                    allowNull: true
                },
                criador: {
                    type: _sequelize2.default.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'editalcursoespecializacao',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: "ano" }
                    ]
                }]
            }
        )

        return this
        
    }
}

exports. default = EditalCursoEspecializacao