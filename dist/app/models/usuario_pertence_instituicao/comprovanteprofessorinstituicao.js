"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ComprovanteProfessorInstituicao extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        login: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          primaryKey: true
        },
        idInstituicao: {
          type: _sequelize2.default.BIGINT,
          allowNull: false,
          primaryKey: true
        },
        inicio: {
          type: _sequelize2.default.DATEONLY,
          allowNull: false,
          primaryKey: true,
          validate: {
            isBefore: {
              args: new Date().toISOString(), // Data atual no formato ISO
              msg: 'A data do evento deve ser anterior à data atual.',
            },
          }
        },
        termino: {
          type: _sequelize2.default.DATEONLY,
          validate: {
              isAfterBegin(value) {
                  if(this.inicio > value) {
                      throw new Error('A data de termino nao pode ser anterior a data de inicio')
                  }
              }
          }
      },
        comprovante: {
          type: _sequelize2.default.TEXT,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'teacher_institution_register',
        indexes: [{
            name: 'primary_key',
            unique: true,
            using: 'BTREE',
            fields: [
                { name: 'login'},
                { name: 'idInstituicao'},
                { name: 'inicio'}
            ]
        }]
      }
    )

    return this
    
  }
}

exports. default = ComprovanteProfessorInstituicao