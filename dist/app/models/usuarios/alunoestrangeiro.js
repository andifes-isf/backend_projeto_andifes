"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoEstrangeiro extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
              login: {
                type: _sequelize2.default.STRING,
                allowNull: false,
                references: {
                    model: 'alunoisf',
                    key: 'login',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
              },
              paisOrigem: {
                type: _sequelize2.default.STRING,
                allowNull: false,
                primaryKey: true,
              },
              comprovante: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
              tipo: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
              codigo: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'alunoisfestrangeiro',
                indexes: [{
                    name: 'primary_key',
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
        this.belongsTo(models.AlunoIsF, {
            foreignKey: 'login'
        })
    }

}

exports. default = AlunoEstrangeiro