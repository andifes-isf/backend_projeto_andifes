import * as Yup from 'yup'

// Utils
import notificationType from '../../utils/notificationType/notificationType'

// Controllers
import UsuarioController from "../../user/usuarioController"
import RelatorioPratico from '../../models/curso_especializacao/relatorio_pratico'

// Repository
import NotificationRepository from "../../repositories/utils/NotificationRepository"
import AdvisorTeacherRepository from '../../repositories/user/AdvisorTeacherRepository'
import SpecializationStudentRepository from '../../repositories/user/SpecializationStudentRepository'

// Utils
import UserTypes from '../../utils/userType/userTypes'
import ReferencedModel from '../../utils/referencedModel/referencedModel'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import MESSAGES from '../../utils/response/messages/messages_pt'
import ErrorType from '../../utils/response/ErrorType/ErrorType'
import CustomError from '../../utils/response/CustomError/CustomError'
import PracticalReportRepository from '../../repositories/specialization_course/PracticalReportRepository'

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

    static async evaluatePracticalReport(report, data) {
        if(data.validated){
            report.validado = true
        } else {
            if(!data.feedback){
                return new CustomError(
                    MESSAGES.FEEDBACK_IS_NEEDED,
                    ErrorType.MISSING_PARAMETER
                )
            }
        }
        
        report.feedback = data.feedback
        report.visualizado_pelo_cursista = false
        report.data_avaliacao = new Date()
        await AdvisorTeacherRepository.savePracticalReport(report)

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

    /**
     * 
     * @requires Authentication
     * @route GET /advisor_teacher/mentee_practcial_report
     * 
     * RETORNO 
     * @returns {int} httpStatus - It might be one of the follow:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message 
     * @returns {string} errorName
     * 
     * if error is false
     * @returns {PRACTICAL_REPORT[]} data 
     */
    async getMenteesMaterials(req, res){
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

        const materials = await AdvisorTeacherRepository.getMaterialsToAnalisys(advisor)

        return res.status(200).json({
            error: false,
            data: materials
        })
    }

    /**
     * 
     * @requires Authentication
     * @route GET /advisor_teacher/practical_reports_not_viewed
     * 
     * RETORNO 
     * @returns {int} httpStatus - It might be one of the follow:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message 
     * @returns {string} errorName
     * 
     * if error is false
     * @returns {PRACTICAL_REPORT[]} data 
     */
    async getNotEvaluatedMaterials(req, res){
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

        const materials = await AdvisorTeacherRepository.getNotViewedPracticalReports(advisor)

        return res.status(200).json({
            error: false,
            data: materials
        })
    }

    /**
     * 
     * @requires Authentication
     * @route GET /advisor_teacher/mentee_practcial_report
     * 
     * RETORNO 
     * @returns {int} httpStatus - It might be one of the follow:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @returns {string} message 
     * @returns {string} errorName
     * 
     * if error is false
     * @returns {PRACTICAL_REPORT[]} data 
     */
    async getNotValidatedMaterials(req, res){
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

        const materials = await AdvisorTeacherRepository.getNotValidatedPracticalReports(advisor)

        return res.status(200).json({
            error: false,
            data: materials
        })
    }

    /**
     * 
     * @requires Authentication
     * @route PUT /advisor_teacher/evaluate_material/:report_name
     * 
     * @param {boolean} req.body.validated
     * @param {string} req.body.feedback - is mandatory if validated is false
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be one of the follow:
     * 200 - SUCCESS
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if error is true
     * @return {string} message
     * @return {string} errorName
     * 
     * if error is false
     * @return {PRACTICAL_REPORT} data 
     *  
     */
    async putEvaluateMaterial(req, res){
        const userType = req.tipoUsuario

        const authorizationError = DocenteOrientadorController.verifyUserType([UserTypes.ADVISOR_TEACHER], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const report = await PracticalReportRepository.findOneForAdvisor(req.loginUsuario, req.params.report_name)

        if(report == null) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.PRACTICAL_REPORT_NOT_FOUND + req.params.report_name,
                errorName: ErrorType.NOT_FOUND 
            })
        }

        const error = await DocenteOrientadorController.evaluatePracticalReport(report, req.body)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: error.message,
                errorName: error.name
            })
        }

        await NotificationRepository.create({
            login: report.login,
            mensagem: `Material "${report.nome}" foi ${report.validado ? "aprovado" : "recusado"} pelo seu orientador`,
            tipo: notificationType.FEEDBACK,
            chaveReferenciado: report.nome,
            modeloReferenciado: ReferencedModel.PRACTICAL_REPORT,
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: report
        })
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

        const teacher = await AdvisorTeacherRepository.findByPk(req.loginUsuario)
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

        const teacher = await AdvisorTeacherRepository.findByPk(req.loginUsuario)

        const reports = await teacher.getGuidanceReport()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: reports
        })
    }
}

export default new DocenteOrientadorController()