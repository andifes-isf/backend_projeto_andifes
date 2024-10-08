import * as Yup from 'yup'

// Models
import CursistaEspecializacao from '../../models/usuarios/cursistaespecializacao'
import DocenteOrientador from '../../models/usuarios/docenteorientador'
import Usuario from '../../models/usuarios/usuario'
import ValidacaoMaterial from '../../models/curso_especializacao/ValidacaoMaterial'
import Notificacao from '../../models/utils/notificacao'

// Controllers
import UsuarioController from './usuarioController'
import OrientadorOrientaCursista from '../../models/curso_especializacao/OrientadorOrientaCursista'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, 'docenteorientador')

            const docenteExistente = await DocenteOrientador.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(docenteExistente) {
                return res.status(409).json({
                    msg: 'Docente Orientador ja cadastrado'
                })
            }
    
            const docente = await DocenteOrientador.create({
                login: req.body.login
            })

            return res.status(201).json(docente)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)            
        }
    }

    async get(_, res){
        try {
            const docentes = await DocenteOrientador.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(docentes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async postOrientado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando as instâncias
            const orientador = await DocenteOrientador.findByPk(req.loginUsuario)
            const cursista = await CursistaEspecializacao.findByPk(req.body.loginCursista)
            if(!cursista){
                return res.status(422).json({
                    error: "Cursista nao existente"
                })
            }

            // Verificando se esse orientado já orienta esse cursista
            const existente = await orientador.hasOrientado(cursista)
            if(existente){
                return res.status(422).json({
                    error: "Esse orientador ja orienta esse cursista"
                })
            }

            // Relacionando os dois
            await orientador.addOrientado(cursista)

            const relacao = await OrientadorOrientaCursista.findOne({
                where: {
                    loginCursista: cursista.login,
                    loginOrientador: orientador.login
                }
            })

            relacao.inicio = new Date().toISOString().split("T")[0]
            await relacao.save()

            return res.status(200).json(relacao)

        } catch (error) {
            console.log(error)
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMaterialDoOrientado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const docente = await DocenteOrientador.findByPk(req.loginUsuario)

            const materiais = await docente.getMaterialAnalise()

            return res.status(200).json(materiais)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMaterialNaoAnalisado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const docente = await DocenteOrientador.findByPk(req.loginUsuario)

            const materiais = await docente.getMaterialAnalise({
                through: {
                    where: {
                        analisadoPeloOrientador: false
                    }
                }
            })

            return res.status(200).json(materiais)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getMaterialNaoValidado(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância do orientador
            const docente = await DocenteOrientador.findByPk(req.loginUsuario)

            const materiais = await docente.getMaterialAnalise({
                through: {
                    where: {
                        analisadoPeloOrientador: true,
                        validado: false
                    }
                }
            })

            return res.status(200).json(materiais)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async putAnalisarMaterial(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            // Pegando instância da validacao
            const analise = await ValidacaoMaterial.findOne({
                where: {
                    nomeMaterial: req.params.nomeMaterial,
                    loginOrientador: req.loginUsuario
                }
            })

            if(req.body.validado){
                analise.validado = true
            } else {
                if(!req.body.feedback){
                    return res.status(400).json({
                        error: "É necessário um feedback para atividades não aprovadas"
                    })
                }
                analise.feedback = req.body.feedback
            }
            analise.analisadoPeloOrientador = true
            analise.visualizadoPeloCursistaAposAnalise = false
            analise.dataVerificacao = new Date()
            await analise.save()

            const notificacao = await Notificacao.create({
                login: analise.loginCursista,
                mensagem: `Material "${analise.nomeMaterial}" foi ${analise.validado ? "aprovado" : "recusado"} pelo seu orientador`,
                tipo: 'feedback',
                chaveReferenciado: analise.nomeMaterial,
                modeloReferenciado: 'materialcursista',
            })

            return res.status(200).json([analise, notificacao])

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
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
            const docente = await Usuario.findByPk(req.loginUsuario)

            const notificacoes = await docente.getNotificacaos() 

            return res.status(200).json(notificacoes)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()