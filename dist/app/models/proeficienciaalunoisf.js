"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class ProeficienciaAlunoIsf extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        login: {
          type: _sequelize2.default.STRING,
          primaryKey: true
        },
        idioma: {
          type: _sequelize2.default.ENUM('ingles', 'portugues', 'alemao', 'frances', 'italiano', 'espanhol', 'japones'),
          primaryKey: true
        },
        nivel: {
          type: _sequelize2.default.CHAR(2),
          primaryKey: true
        },
        comprovante: {
          type: _sequelize2.default.TEXT,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: false,
        tableName: 'proeficienciaalunoisf',
        indexes: [{
            name: 'primary_key',
            unique: true,
            using: 'BTREE',
            fields: [
                { name: 'login'},
                { name: 'idioma'},
                { name: 'nivel'}
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

exports. default = ProeficienciaAlunoIsf