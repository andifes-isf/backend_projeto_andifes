"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class AlunoIsFParticipaTurmaOC extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                  type: _sequelize2.default.STRING,
                  allowNull: false,
                  primaryKey: true
                },
                idTurma: {
                  type: _sequelize2.default.BIGINT,
                  allowNull: false,
                  primaryKey: true
                },
                inicio: {
                  type: _sequelize2.default.DATEONLY,
                  allowNull: false
                },
                termino: _sequelize2.default.DATEONLY
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'isfstudent_in_occlass',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login'},
                        { name: 'idTurma'}
                    ]
                }]
            }
        )

        return this
    
    }
}

exports. default = AlunoIsFParticipaTurmaOC