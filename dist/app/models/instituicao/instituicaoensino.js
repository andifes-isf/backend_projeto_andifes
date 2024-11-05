"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class InstituicaoEnsino extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                idInstituicao: {
                    type: _sequelize2.default.BIGINT,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: {
                    type: _sequelize2.default.STRING,
                    unique: true
                },
                documentoVinculo: _sequelize2.default.TEXT,
                brasileira: _sequelize2.default.BOOLEAN
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'instituicaoensino',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'idInstituicao' }
                    ]
                }]
            }
        )

        return this

    }

    static associate(models) {
        this.belongsToMany(models.AlunoDeInstituicao, {
            through: 'comprovantealunoinstituicao',
            foreignKey: 'idInstituicao',
            targetKey: 'login',
            timestamps: false
        })

        this.belongsToMany(models.ProfessorIsF, {
            through: 'comprovanteprofessorinstituicao',
            foreignKey: 'idInstituicao',
            sourceKey: 'idInstituicao',
            timestamps: false
        })

        this.hasOne(models.InstituicaoEnsinoBrasileira, {
            foreignKey: 'idInstituicao'
        })

        this.hasOne(models.InstituicaoEnsinoEstrangeira, {
            foreignKey: 'idInstituicao'
        })
    }

}

exports. default = InstituicaoEnsino