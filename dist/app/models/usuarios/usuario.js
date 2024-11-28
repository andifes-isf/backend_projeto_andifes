"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class Usuario extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    allowNull: false,
                    primaryKey: true
                  },
                name: _sequelize2.default.STRING,
                surname: _sequelize2.default.STRING,
                DDI: _sequelize2.default.INTEGER,
                DDD: _sequelize2.default.INTEGER,
                phone: _sequelize2.default.INTEGER,
                ethnicity: _sequelize2.default.ENUM('amarelo', 'branco', 'indigena', 'pardo', 'preto', 'quilombola'),
                gender: _sequelize2.default.ENUM('feminino', 'masculino', 'nao binario', 'outros'),
                active: _sequelize2.default.BOOLEAN,
                email: _sequelize2.default.STRING,
                email_domain: _sequelize2.default.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
                password: _sequelize2.default.VIRTUAL,
                encrypted_password: _sequelize2.default.STRING,
                type: _sequelize2.default.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante')
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'user',
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        { name: "login" }
                    ]
                }, {
                    name: 'unique_telefone',
                    unique: true,
                    fields: ['DDI', 'DDD', 'phone'],
                }]
            }
        )

        // Hooks
        this.addHook('beforeSave', async (user) => {
            if(user.password) {
                const salt = await _bcrypt2.default.genSalt(12)
                user.encrypted_password = await _bcrypt2.default.hash(user.password, salt)
            }
        })

        return this

    }

    static associate(models) {
        this.hasOne(models.AlunoIsF, {
            foreignKey: 'login'
        })

        this.hasOne(models.ProfessorIsF, {
            foreignKey: 'login'
        })

        this.hasMany(models.Notificacao, {
            foreignKey: 'login'
        })

        this.hasMany(models.Notificacao, {
            foreignKey: 'login',
            scope: {
                lida: false
            },
            as: 'notificacoesNaoLidas'
        })
    }
}

exports. default = Usuario