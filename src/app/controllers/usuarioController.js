import * as Yup from 'yup'
import Usuario from '../models/usuario'

class usuarioController {
    async post(req, res) {
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
            return res.status(400).json({
                error: "Usuário já existente"
            })
        }

        await Usuario.create({
            login: req.body.login,
            name: req.body.nome,
            sobrenome: req.body.sobrenome,
            DDI: req.body.DDI,
            DDD: req.body.DDD,
            telefone: req.body.telefone,
            raca: req.body.raca,
            genero: req.body.genero,
            ativo: 1,
            nomeEmail: req.body.nomeEmail,
            dominio: req.body.dominio,
            senha: req.body.senha,
            tipo: req.body.tipo
        })

        return res.status(201).json({
            msg: `Usuário ${req.body.login} criado com sucesso`
        })

    }
}

export default new usuarioController()