"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProfessorIsFMinistraTurmaOC extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                      model: 'professorisf',
                      key: 'login',
                      name: 'fk_login_professorisf_ministra_turmaoc'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                idTurma: {
                    type: _sequelize2.default.BIGINT,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: 'turmaoc',
                        key: 'idTurma',
                        name: 'fk_idTurma_professorisf_ministra_turmaoc'
                    },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                },
                inicio: {
                    type: _sequelize2.default.DATEONLY,
                    allowNull: false,
                    primaryKey: true
                },
                termino: _sequelize2.default.DATEONLY
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'professorisfministraturmaoc',
                indexes: [{
                    name: 'primary_key',
                    unique: true,
                    using: 'BTREE',
                    fields: [
                        { name: 'login' },
                        { name: 'idTurma' },
                        { name: 'inicio' }
                    ]
                }]
            }
        )

        return this
    }
}

exports. default = ProfessorIsFMinistraTurmaOC