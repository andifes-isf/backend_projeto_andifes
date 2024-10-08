import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    primaryKey: true
                },
                nome: Sequelize.STRING,
                sobrenome: Sequelize.STRING,
                DDI: Sequelize.INTEGER,
                DDD: Sequelize.INTEGER,
                telefone: Sequelize.INTEGER,
                etnia: Sequelize.ENUM('branco', 'pardo', 'preto', 'amarelo', 'indigena'),
                genero: Sequelize.ENUM('masculino', 'feminino', 'nao binario'),
                ativo: Sequelize.BOOLEAN,
                nomeEmail: Sequelize.STRING,
                dominio: Sequelize.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
                senha: Sequelize.VIRTUAL,
                senha_encriptada: Sequelize.STRING,
                tipo: Sequelize.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante'),
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
                const salt = await bcrypt.genSalt(12)
                usuario.senha_encriptada = await bcrypt.hash(usuario.senha, salt)
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
    }
}

export default Usuario