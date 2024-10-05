"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class DocenteOrientador extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                }
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'docenteorientador',
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
        this.belongsTo(models.Usuario, {
            foreignKey: 'login'
        })

        this.belongsToMany(models.CursistaEspecializacao, {
            through: 'orientadororientacursista',
            foreignKey: 'loginOrientador',
            sourceKey: 'login',
            targetKey: 'login',
            as: 'orientado'
        })

        this.belongsToMany(models.MaterialCursista, {
            through: 'ValidacaoMaterial',
            foreignKey: 'loginOrientador',
            sourceKey: 'login',
            targetKey: 'nome',
            as: 'materialAnalise'
        })
    }
}

exports. default = DocenteOrientador