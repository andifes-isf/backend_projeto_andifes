"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class InstituicaoEnsinoBrasileira extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: _sequelize2.default.BIGINT,
                    allowNull: false
                },
                CNPJ: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                },
                sigla: {
                    type: _sequelize2.default.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensinobrasileira',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'CNPJ' }
                    ]
                }]
            }
        )

        return this

    }
}

exports. default = InstituicaoEnsinoBrasileira