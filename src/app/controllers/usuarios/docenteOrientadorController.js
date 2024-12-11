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
import AdvisorTeacherRepository from '../../repositories/user/AdvisorTeacherRepository'

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import ReferencedModel from '../../utils/referencedModel/referencedModel'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../utils/response/messages/messages_pt'
import SpecializationStudentRepository from '../../repositories/user/SpecializationStudentRepository'
import ErrorType from '../../utils/response/ErrorType/ErrorType'
import CustomError from '../../utils/response/CustomError/CustomError'

class DocenteOrientadorController extends UsuarioController{
    // UTILS
    static async verifyMenteeCondition(login, advisor_login) {
        const mentee = await DocenteOrientadorController.verifyNonExistingObject(SpecializationStudentRepository, login, MESSAGES.USER_NOT_FOUND)

        if (mentee.has_mentor == true) {
            const advisor = await mentee.getActiveMentorship()

            return new CustomError(
                MESSAGES.EXISTING_MENTORSHIP + advisor[0].login,
                ErrorType.DUPLICATE_ENTRY
            )
        }

        return mentee
    }

    static async deleteMentorship(advisor_login, mentee_login) {
        const relation = await AdvisorTeacherRepository.getMentorship(advisor_login, mentee_login)

        if (relation == null) {
            return new CustomError(
                MESSAGES.MENTORSHIP_NOT_FOUND + mentee_login,
                ErrorType.NOT_FOUND
            )
        }

        await AdvisorTeacherRepository.deleteMentorship(relation)

        // Aqui seria um local para observer? o cursista precisa ficar olhando para ver se esse relacionamento não sera cortado, e caso seja ele precis settar seu has_mentor para false
        const mentee = await SpecializationStudentRepository.findByPk(mentee_login)

        mentee.has_mentor = false
        await mentee.save()

        return relation
    }


    /**
     * 
     * @route POST /advisor_teacher
     * 
     * @param {string} req.body.login
     * @param {string} req.body.name
     * @param {string} req.body.surname
     * @param {int} req.body.DDI
     * @param {int} req.body.DDD
     * @param {int} req.body.phone
     * @param {int || string} req.body.ethnicity - The ethnicity of the user. Must be one of the following (int - "value"): 
     * 1 - "amarelo"
     * 2 - "branco"
     * 3 - "indigena"
     * 4 - "pardo"
     * 5 - "preto"
     * 6 - "quilombola"
     * @param {int || string} req.body.gender - The gender of the user. Must be one of the following (int - "value"): 
     * 1 - "feminino"
     * 2 - "masculino"
     * 3 - "nao binario"
     * 4 - "outros"
     * @param {string} req.body.email
     * @param {int || string} req.body.email_domain - The email domain of the user's email. Must be one of the following (int - "value"):
     * 1 - "gmail.com"
     * 2 - "yahoo.com"
     * 3 - "outlook.com"
     * 4 - "hotmail.com"
     * @param {string} req.body.password
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {DocenteOrientador} data
     */
     async post(req, res) {
         const existingTeacher = await DocenteOrientadorController.verifyExistingObject(AdvisorTeacherRepository, req.body.login, MESSAGES.EXISTING_ADVISOR_TEACHER)

        if(existingTeacher) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingTeacher.message,
                errorName: existingTeacher.name
            })
        }

        
        const { error, user } = await DocenteOrientadorController.postUser(req, res, UserTypes.ADVISOR_TEACHER)
        
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: user.message,
                errorName: user.name
            })
        }
        
        const teacher = await AdvisorTeacherRepository.create(req.body.login)
        
        return res.status(httpStatus.CREATED).json({
            error: false,
            data: teacher
        })
    }

    /**
     * 
     * @route GET /advisor_teacher
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if error is true
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {DocenteOrientador[]} data
     */
    async get(_, res){
        const teachers = await AdvisorTeacherRepository.findAll()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: teachers
        })
    }

    /**
     * 
     * @requires Authentication
     * @route POST /advisor_teacher/mentee
     * 
     * @param {string} req.body.mentee_login 
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be one of the follow:
     * 201 - CREATED
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message - error's message 
     * @returns {string} errorName - error's name
     * 
     * if error is false
     * @returns {OrientadorOrientaCursista} data 
     */
    async postOrientado(req, res){
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([UserTypes.ADVISOR_TEACHER], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const advisor = await AdvisorTeacherRepository.findByPk(req.loginUsuario)
        const specializationStudent = await DocenteOrientadorController.verifyMenteeCondition(req.body.mentee_login)

        if(specializationStudent instanceof CustomError){
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: specializationStudent.message,
                errorName: specializationStudent.name
            })
        }

        const relation = await AdvisorTeacherRepository.createMentorship(advisor.login, specializationStudent)

        return res.status(200).json({
            error: false,
            data: relation
        })
    }

    /**
     * 
     * @requires Authentication
     * @route DELETE /advisor_teacher/mentee
     * 
     * @param {string} req.body.mentee_login 
     * 
     * RETORNO
     * @returns {int} httpStatus - It might be one of the follow:
     * 200 - SUCCESS
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR 
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message
     * @returns {string} errorName
     * 
     * if error is false
     * @returns {OrientadorOrientaCursista} data
     */
    async deleteOrientado(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([UserTypes.ADVISOR_TEACHER], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const relation = await DocenteOrientadorController.deleteMentorship(req.loginUsuario, req.body.mentee_login)

        if (relation instanceof CustomError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: relation.message,
                errorName: relation.name
            })
        }

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: relation
        })
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