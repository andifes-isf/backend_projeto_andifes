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

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import ReferencedModel from '../../utils/referencedModel/referencedModel'

class coordenadorNacionalIdiomaController {
    async post(req, res) {
        try {            
            await UsuarioController.post(req, res, UserTypes.ADVISOR_TEACHER)

            const existingTeacher = await DocenteOrientador.findOne({
                where: {
                    login: req.body.login
                }
            })
    
            if(existingTeacher) {
                return res.status(409).json({
                    error: `${existingTeacher.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const teacher = await DocenteOrientador.create({
                login: req.body.login
            })

            return res.status(201).json(teacher)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)            
        }
    }

    async get(_, res){
        try {
            const teachers = await DocenteOrientador.findAll({
                include: [
                    {
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo']
                        }
                    }
                ]
            })
    
            return res.status(200).json(teachers)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async postOrientado(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const advisor = await DocenteOrientador.findByPk(req.loginUsuario)
            const specializationStudent = await CursistaEspecializacao.findByPk(req.body.loginCursista)
            
            if(!specializationStudent){
                return res.status(422).json({
                    error: `${req.body.loginCursista} ` + MESSAGES.NOT_FOUND
                })
            }

            const existing = await advisor.hasOrientado(specializationStudent)
            if(existing){
                return res.status(422).json({
                    error: MESSAGES.ADVISOR_ADVISES_STUDENT
                })
            }

            await advisor.addOrientado(specializationStudent)

            const relation = await OrientadorOrientaCursista.findOne({
                where: {
                    loginCursista: cursista.login,
                    loginOrientador: orientador.login
                }
            })

            relation.inicio = new Date().toISOString().split("T")[0]
            await relation.save()

            return res.status(200).json(relation)

        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getMenteesMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const advisor = await DocenteOrientador.findByPk(req.loginUsuario)

            const materials = await advisor.getMaterialsToAnalysis()

            return res.status(200).json(materials)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotEvaluatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
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
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async getNotValidatedMaterials(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
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
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async putEvaluateMaterial(req, res){
        try {
            if(!(req.tipoUsuario === UserTypes.ADVISOR_TEACHER)){
                return res.status(403).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }

            const report = await RelatorioPratico.findOne({
                where: {
                    nome: req.params.material_name,
                    orientador: req.loginUsuario
                }
            })

            if(report == null) {
                throw new Error(`Relatório prático ` + MESSAGES.NOT_FOUND)
            }

            if(req.body.validated){
                report.validado = true
            } else {
                if(!req.body.feedback){
                    return res.status(400).json({
                        error: MESSAGES.FEEDBACK_IS_NEEDED
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
                modeloReferenciado: ReferencedModel.PRACTICAL_REPORT,
            })

            return res.status(200).json([report, notification])

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new coordenadorNacionalIdiomaController()