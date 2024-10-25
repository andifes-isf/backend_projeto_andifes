import * as Yup from 'yup'

// Utils
import Op from 'sequelize'
import notificationType from '../../utils/notificationType/notificationType'

// Models
import CursistaEspecializacao from '../../models/usuarios/cursistaespecializacao'
import DocenteOrientador from '../../models/usuarios/docenteorientador'
import Usuario from '../../models/usuarios/usuario'
import Notificacao from '../../models/utils/notificacao'

// Controllers
import UsuarioController from './usuarioController'
import OrientadorOrientaCursista from '../../models/curso_especializacao/OrientadorOrientaCursista'
import RelatorioPratico from '../../models/curso_especializacao/relatorio_pratico'

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

    async getMenteesMaterials(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const advisor = await DocenteOrientador.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis()

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getNotEvaluatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const advisor = await DocenteOrientador.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis({
                where: {
                    data_avaliacao: null
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async getNotValidatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const advisor = await DocenteOrientador.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis({
                where: {
                    data_avaliacao: {
                        [Op.ne]: null
                    },
                    validado: false
                }
            })

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }

    async putEvaluateMaterial(req, res){
        try {
            if(!(req.tipoUsuario === 'docenteorientador')){
                return res.status(403).json({
                    error: 'Acesso negado'
                })
            }

            const report = await RelatorioPratico.findOne({
                where: {
                    nome: req.params.material_name,
                    orientador: req.loginUsuario
                }
            })

            if(req.body.validated){
                report.validado = true
            } else {
                if(!req.body.feedback){
                    return res.status(400).json({
                        error: "É necessário um feedback para atividades não aprovadas"
                    })
                }
                report.feedback = req.body.feedback
            }

            report.visualizado_pelo_cursista = false
            report.data_avaliacao = new Date()
            await report.save()

            const notification = await Notificacao.create({
                login: report.login,
                mensagem: `Material "${report.nome}" foi ${report.validado ? "aprovado" : "recusado"} pelo seu orientador`,
                tipo: notificationType.FEEDBACK,
                chaveReferenciado: report.nome,
                modeloReferenciado: 'materialcursista',
            })

            return res.status(200).json([report, notification])

        } catch (error) {
            return res.status(500).json('Ocorreu um erro interno no servidor: ' + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()