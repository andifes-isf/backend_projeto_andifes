import * as Yup from 'yup'
import Usuario from '../models/usuario'

class usuarioController {
    async post(req, res, tipo) {
        // const schema = Yup.object().shape({
        //     login: Yup.string().required(),
        //     name: Yup.string().required(),
        //     sobrenome: Yup.string().required(),
        //     DDI: Yup.number().required(),
        //     DDD: Yup.number().required(),
        //     telefone: Yup.number().required(),
        //     nomeEmail: Yup.string().required(),
        //     dominio: Yup.string().required(),
        //     senha: Yup.string().required(),
        // })

        // if(!(await schema.isValid(req.body))) {
        //     return res.json({
        //         error: 'Validação falhou'
        //     })
        // }

        const usuarioExistente = await Usuario.findOne({
            where: {
                login: req.body.login
            }
        })

        if(usuarioExistente) {
            return 0
        }

        return await Usuario.create({
            login: req.body.login,
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            DDI: req.body.DDI,
            DDD: req.body.DDD,
            telefone: req.body.telefone,
            etnia: req.body.etnia,
            genero: req.body.genero,
            ativo: 1,
            nomeEmail: req.body.nomeEmail,
            dominio: req.body.dominio,
            senha: req.body.senha,
            tipo: tipo
        })
    }

    async get(_, res) {
        try {
            const usuarios = await Usuario.findAll()
            
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMyData(req, res) {
        try {
            const usuario = await Usuario.findOne({
                where: {
                    login: req.loginUsuario
                }
            })
    
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new usuarioController()