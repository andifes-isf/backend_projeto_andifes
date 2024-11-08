"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

// Utils
var _emailDomainFactory = require('../../utils/emailDomain/emailDomainFactory'); var _emailDomainFactory2 = _interopRequireDefault(_emailDomainFactory);
var _messages_pt = require('../../utils/response/messages/messages_pt'); var _messages_pt2 = _interopRequireDefault(_messages_pt);

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

        const usuarioExistente = await _usuario2.default.findOne({
            where: {
                login: req.body.login
            }
        })

        if(usuarioExistente) {
            return 0
        }

        if(_emailDomainFactory2.default.getDomain(req.body.dominio) == null) {
            throw new Error(_messages_pt2.default.DOMAIN_NOT_SUPPORTED)
        }

        return await _usuario2.default.create({
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
            const users = await _usuario2.default.findAll()
            
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMyData(req, res) {
        try {
            const user = await _usuario2.default.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacoes(req, res){
        try {
            const user = await _usuario2.default.findByPk(req.loginUsuario)

            const notifications = await user.getNotificacaos() 

            return res.status(200).json(notifications)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacoesNaoLidas(req, res){
        try {
            const user = await _usuario2.default.findByPk(req.loginUsuario)

            const notifications = await user.getNotificacoesNaoLidas() 

            return res.status(200).json(notifications)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotificacao(req, res){
        try {
            const user = await _usuario2.default.findByPk(req.loginUsuario)

            const notification = await user.getNotificacaos({
                where: {
                    idNotificacao: req.params.id,
                    login: req.loginUsuario
                }
            }) 
            
            if(notification.length === 0){
                return res.status(404).json({
                    error: 'Notificação ' + _messages_pt2.default.NOT_FOUND
                })
            }
            notification[0].lida = 1
            await notification[0].save()

            return res.status(200).json(notification)

        } catch (error) {
            return res.status(500).json(_messages_pt2.default.INTERNAL_SERVER_ERROR + error)
        }
    }
}

exports. default = new usuarioController()