"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

class Usuario extends _sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: _sequelize2.default.STRING,
                    primaryKey: true
                },
                nome: _sequelize2.default.STRING,
                sobrenome: _sequelize2.default.STRING,
                DDI: _sequelize2.default.INTEGER,
                DDD: _sequelize2.default.INTEGER,
                telefone: _sequelize2.default.INTEGER,
                etnia: _sequelize2.default.ENUM('branco', 'pardo', 'preto', 'amarelo', 'indigena'),
                genero: _sequelize2.default.ENUM('masculino', 'feminino', 'nao binario'),
                ativo: _sequelize2.default.BOOLEAN,
                nomeEmail: _sequelize2.default.STRING,
                dominio: _sequelize2.default.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
                senha: _sequelize2.default.VIRTUAL,
                senha_encriptada: _sequelize2.default.STRING,
                tipo: _sequelize2.default.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante'),
            },
            {
                sequelize,
                timestamps: false,
                tableName: 'usuario',
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
                    fields: ['DDI', 'DDD', 'telefone'],
                }]
            }
        )

        // Hooks
        this.addHook('beforeSave', async (usuario) => {
            if(usuario.senha) {
                const salt = await _bcrypt2.default.genSalt(12)
                usuario.senha_encriptada = await _bcrypt2.default.hash(usuario.senha, salt)
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
    }
}

exports. default = Usuario