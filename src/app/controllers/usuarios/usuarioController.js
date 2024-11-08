import * as Yup from 'yup'
import Usuario from '../../models/usuarios/usuario'

// Utils
import EmailDomainFactory from '../../utils/emailDomain/emailDomainFactory'
import MESSAGES from '../../utils/response/messages/messages_pt'

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

        if(EmailDomainFactory.getDomain(req.body.dominio) == null) {
            throw new Error(MESSAGES.DOMAIN_NOT_SUPPORTED)
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
            const users = await Usuario.findAll()
            
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMyData(req, res) {
        try {
            const user = await Usuario.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacoes(req, res){
        try {
            const user = await Usuario.findByPk(req.loginUsuario)

            const notifications = await user.getNotificacaos() 

            return res.status(200).json(notifications)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacoesNaoLidas(req, res){
        try {
            const user = await Usuario.findByPk(req.loginUsuario)

            const notifications = await user.getNotificacoesNaoLidas() 

            return res.status(200).json(notifications)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacao(req, res){
        try {
            const user = await Usuario.findByPk(req.loginUsuario)

            const notification = await user.getNotificacaos({
                where: {
                    idNotificacao: req.params.id,
                    login: req.loginUsuario
                }
            }) 
            
            if(notification.length === 0){
                return res.status(404).json({
                    error: 'Notificação ' + MESSAGES.NOT_FOUND
                })
            }
            notification[0].lida = 1
            await notification[0].save()

            return res.status(200).json(notification)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new usuarioController()