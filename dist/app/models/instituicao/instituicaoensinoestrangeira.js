"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class InstituicaoEnsinoEstrangeira extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: _sequelize2.default.BIGINT,
                    allowNull: false
                },
                pais: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                },
                sigla: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensinoestrangeira',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'sigla' },
                        { name: 'pais' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models) {
        this.belongsTo(models.InstituicaoEnsino, {
            foreignKey: 'idInstituicao'
        })
    }

}

exports. default = InstituicaoEnsinoEstrangeira