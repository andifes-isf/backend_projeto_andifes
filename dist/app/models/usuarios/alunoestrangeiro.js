"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoEstrangeiro extends _sequelize.Model {
    static init (sequelize) {
        super.init(
            {
              login: {
                type: _sequelize2.default.STRING,
                allowNull: false,
                primaryKey: true,
              },
              home_country: {
                type: _sequelize2.default.STRING,
                allowNull: false,
                primaryKey: true,
              },
              register: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
              type: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
              code: {
                type: _sequelize2.default.STRING,
                allowNull: false
              },
            },
            {                
                sequelize,
                timestamps: false,
                tableName: 'isfstudent_foreign',
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