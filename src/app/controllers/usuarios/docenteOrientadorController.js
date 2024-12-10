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

// Repository
import NotificationRepository from "../../repositories/utils/NotificationRepository"

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import ReferencedModel from '../../utils/referencedModel/referencedModel'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../utils/response/messages/messages_pt'

class DocenteOrientadorController extends UsuarioController{
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

    /**
     * 
     * @requires Authentication
     * @route POST /advisor_teacher/guidance_report
     * 
     * @param {int} req.body.workload
     * @param {string} req.body.note - it can be null
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @return {GuidanceReport} data
     * 
     */
    async postGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([UserTypes.ADVISOR_TEACHER], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const teacher = await DocenteOrientador.findByPk(req.loginUsuario)
        const student = await teacher.getMentee()

        const report = await teacher.createGuidanceReport({
            workload: req.body.workload,
            note: req.body.note || null,
            report_type: 'advisor_teacher',
            created_at: new Date().toISOString().split('T')[0]
        })



        await NotificationRepository.create({
            login: student[0].login,
            mensagem: req.loginUsuario + MESSAGES.NEW_GUIDANCE_REPORT,
            tipo: notificationType.AVISO,
            chaveReferenciado: report.id,
            modeloReferenciado: ReferencedModel.GUIDANCE_REPORT
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: report
        })
    }

    /**
     * 
     * @requires Authentication
     * @route GET /advisor_teacher/guidance_report
     * 
     * @return {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {GuidanceReport[]} data 
     */
    async getGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([UserTypes.ADVISOR_TEACHER], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const teacher = await DocenteOrientador.findByPk(req.loginUsuario)

        const reports = await teacher.getGuidanceReport()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: reports
        })
    }
}

export default new DocenteOrientadorController()