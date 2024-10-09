"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _usuario = require('../../models/usuarios/usuario'); var _usuario2 = _interopRequireDefault(_usuario);

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
            const usuarios = await _usuario2.default.findAll()
            
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getMyData(req, res) {
        try {
            const usuario = await _usuario2.default.findOne({
                where: {
                    login: req.loginUsuario
                }
            })

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async getNotificacoes(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const docente = await _usuario2.default.findByPk(req.loginUsuario)

            const notificacoes = await docente.getNotificacaos() 

            return res.status(200).json(notificacoes)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getNotificacoesNaoLidas(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const docente = await _usuario2.default.findByPk(req.loginUsuario)

            const notificacoes = await docente.getNotificacoesNaoLidas() 

            return res.status(200).json(notificacoes)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getNotificacao(req, res){
        try {
            // Pegando instância do orientador
            const docente = await _usuario2.default.findByPk(req.loginUsuario)

            const notificacao = await docente.getNotificacaos({
                where: {
                    idNotificacao: req.params.id,
                    login: req.loginUsuario
                }
            }) 
            
            if(notificacao.length === 0){
                return res.status(404).json({
                    error: "Pagina não encontrada"
                })
            }
            console.log(notificacao)
            notificacao[0].lida = 1
            await notificacao[0].save()

            return res.status(200).json(notificacao)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

exports. default = new usuarioController()