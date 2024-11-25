import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'

class Usuario extends Model {
    static init(sequelize) {
        super.init(
            {
                login: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    primaryKey: true
                  },
                name: Sequelize.STRING,
                surname: Sequelize.STRING,
                DDI: Sequelize.INTEGER,
                DDD: Sequelize.INTEGER,
                phone: Sequelize.INTEGER,
                ethnicity: Sequelize.ENUM('amarelo', 'branco', 'indigena', 'pardo', 'preto', 'quilombola'),
                gender: Sequelize.ENUM('feminino', 'masculino', 'nao binario', 'outros'),
                active: Sequelize.BOOLEAN,
                email: Sequelize.STRING,
                email_domain: Sequelize.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
                password: Sequelize.VIRTUAL,
                encrypted_password: Sequelize.STRING,
                type: Sequelize.ENUM('alunoisf', 'professorisf', 'cursista', 'coordenadornacional', 'coordenadornacionalidioma', 'docenteorientador', 'docenteministrante')
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
                const salt = await bcrypt.genSalt(12)
                user.encrypted_password = await bcrypt.hash(user.password, salt)
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

export default Usuario