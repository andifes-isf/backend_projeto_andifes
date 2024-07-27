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
                name: Sequelize.STRING,
                sobrenome: Sequelize.STRING,
                DDI: Sequelize.INTEGER,
                DDD: Sequelize.INTEGER,
                telefone: Sequelize.INTEGER,
                raca: Sequelize.ENUM('branco', 'pardo', 'preto', 'amarelo', 'indigena'),
                genero: Sequelize.ENUM('masculino', 'feminino', 'nao binario'),
                ativo: Sequelize.BOOLEAN,
                nomeEmail: Sequelize.STRING,
                dominio: Sequelize.ENUM('gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'),
                senha: Sequelize.STRING,
                senha_encriptada: Sequelize.VIRTUAL,
                tipo: Sequelize.ENUM('alunoisf', 'professorisf')
            },
            {
                sequelize,
                timestamps: false,
                indexes: [{
                    name: "primary_key",
                    unique: true,
                    using: "BTREE",
                    fields: [
                        {name: "login"}
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
            if(usuario.senha_encriptada) {
                usuario.senha = await bcrypt.hash(usuario.senha_encriptada, 8)
            }
        })

        return this

    }
}

export default Usuario