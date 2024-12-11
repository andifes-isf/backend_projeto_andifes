import { Sequelize } from "sequelize"

// Modelscursistacursaturmaespecializacao"
import InteresseNaDisciplina from '../../models/curso_especializacao/InteresseNaDisciplina'
import OuvidoriaCursoEspecializacao from "../../models/curso_especializacao/ouvidoria_curso_especializacao"

// Controllers
import ProfessorIsFController from './professorIsFController'

// Repositories
import PracticalReportRepository from "../../repositories/specialization_course/PracticalReportRepository"
import NotificationRepository from "../../repositories/utils/NotificationRepository"
import SpecializationStudentRepository from "../../repositories/user/SpecializationStudentRepository"
import SpecializationDisciplineClassRepository from "../../repositories/specialization_course/SpecializationDisciplineClassRepository"
import SpecializationDisciplineRepository from "../../repositories/specialization_course/SpecializationDisciplineRepository"

// Utils
import notificationType from '../../utils/notificationType/notificationType'
import LanguageFactory from "../../utils/languages/languageFactory"
import UserTypes from '../../utils/userType/userTypes'
import ReferencedModel from "../../utils/referencedModel/referencedModel"
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from "../../utils/response/CustomError/CustomError"
import ErrorType from "../../utils/response/ErrorType/ErrorType"
import httpStatus from "../../utils/response/httpStatus/httpStatus"

class CursistaEspecializacaoController extends ProfessorIsFController {
    // Auxiliar Functions
    static async getEntities(login){
        const specializationStudent = await SpecializationStudentRepository.findByPk(login)
        const advisor = await SpecializationStudentRepository.getAdvisor(specializationStudent)

        
        
        return [ specializationStudent, advisor[0] ]

        // como cursista.getOrientador() retorna um array, e nesse caso um array de um único elemento, estou retornando somente esse elemento

    }

    static verifyLanguage(language) {
        return LanguageFactory.getLanguage(language)
    }

    static async createReport(specializationStudent, advisor, material){
        const { language, name, level, description, workload, portfolio_link, category } = material

        if(CursistaEspecializacaoController.verifyLanguage(language) == null) {
            return new CustomError(
                MESSAGES.LANGUAGE_NOT_FOUND,
                ErrorType.NOT_FOUND
            )            
        }

        return await SpecializationStudentRepository.createPracticalReport(specializationStudent, {
            idioma: language,
            nome: name,
            nivel: level,
            descricao: description,
            cargaHoraria: workload,
            orientador: advisor.login,
            link_portfolio: portfolio_link,
            categoria: category,
        })
    }

    static async verifyExistingReport(login, name) {
        const existinReport = await PracticalReportRepository.findOne(login, name)

        if (existinReport) {
            return new CustomError(
                MESSAGES.EXISTING_PRACTICAL_REPORT,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async inserirInteresse(discipline, year, specializationStudent){
        const { name } = discipline

        const existingDiscipline = await SpecializationDisciplineRepository.findOne(name)

        if (!existingDiscipline) {
            return new CustomError(
                MESSAGES.DISCIPLINE_NOT_FOUND + name,
                ErrorType.NOT_FOUND
            )
        }
        
        const existingInterest = await InteresseNaDisciplina.findOne({
            where: {
                login: specializationStudent.login,
                nomeDisciplina: name,
                ano: year
            }
        })

        if (existingInterest) {
            return new CustomError(
                MESSAGES.EXISTING_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + name,
                ErrorType.DUPLICATE_ENTRY
            )
        }

        await specializationStudent.createInteresse({
            ano: year,
            nomeDisciplina: name,
            preferencia: discipline.preference
        })
    }

    static async inserirDisciplinas(data, specializationStudent){
        const disciplines = data.disciplines
        const year = data.year
        
        const promises = disciplines.map(async (discipline) => {
            const insertInterest = await CursistaEspecializacaoController.inserirInteresse(discipline, year, specializationStudent)
            
            if (insertInterest) {
                return {
                    error: true,
                    errorInfo: insertInterest
                }
            }

            return {
                error: false,
                discipline: discipline.name
            }
        })
        
        const results = await Promise.allSettled(promises)
        let success = []
        let fail = []
        let unexpectedError = []
        
        results.forEach((result) => {
            console.log(result.value.errorInfo)
            if (result.value.error === false) {
                success.push({message: MESSAGES.NEW_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + result.value.discipline})
            } else if (result.value.error === true) {
                fail.push([{message: result.value.errorInfo.message, name: result.value.errorInfo.name}])
            } else {
                unexpectedError.push({message: `Erro inesperado:` + result.reason})
            }
        })

        return { success: success, fail: fail, unexpectedError: unexpectedError}
    }

    // Endpoints
    
    /**
    *
    * @route POST /specialization_student
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
    * @param {string} req.body.poca - For now is just a string representing the user's POCA certificate 
    * @param {date} req.body.start
    * 
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
    * @returns {CursistaEspecializacao} data
    */
    async post(req, res) {
        const existingSpecializationStudent = await CursistaEspecializacaoController.verifyExistingObject(SpecializationStudentRepository, req.body.login, MESSAGES.EXISTING_SPECIALIZATION_STUDENT)
        
        if (existingSpecializationStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingSpecializationStudent.message,
                errorName: existingSpecializationStudent.name
            })
        }
        
        const { error, teacher } = await CursistaEspecializacaoController.postIsFTeacher(req, res, 1)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: teacher.message,
                errorName: teacher.name
            })
        }
        
        const specializationStudent = await SpecializationStudentRepository.create({
            login: req.body.login
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: specializationStudent
        })
    }

    /**
     * 
     * @route GET /specialization_student
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {CursistaEspecializacao[]} data
     */
    async get(_, res){
        const specializationStudents = await SpecializationStudentRepository.findAll()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: specializationStudents
        })
    }
    
    /**
     * 
     * @route POST /specialization_student/practical_report
     * @requires Authentication
     * 
     * @param {string} req.body.language - The language of the report. It must be one of the following:
     * 1 - "ingles"
     * 2 - "portugues",
     * 3 - "alemao"
     * 4 - "frances"
     * 5 - "italiano"
     * 6 - "espanhol"
     * 7 - "japones"
     * @param {string} req.body.name
     * @param {char[2]} req.body.level - The level of the report
     * - For japanese, it should be used N5 -> N1
     * - For other languages, it should be used A1 -> C2
     * @param {string} req.body.description
     * @param {int} req.body.workload
     * @param {portfolio_link} req.body.portfolio_link
     * @param {string} req.body.category - The category of the report. It must be one of the following:
     * 1 - "preparacao do curso"
     * 2 - "preparacao material didatico"
     * 3 - "preparacao de atividades"
     * 4 - "preparacao de aulas"
     * 5 - "preparacao de oficinas"
     * 6 - "preparacao de testes de nivelamento"
     * 
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 400 - BAD_REQUEST
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data
     */
    async postPracticalReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const existingReport = await CursistaEspecializacaoController.verifyExistingReport(req.loginUsuario, req.body.name)
        
        if(existingReport){
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingReport.message,
                errorName: existingReport.name
            })
        }
        
        const [specializationStudent, advisor] = await        CursistaEspecializacaoController.getEntities(req.loginUsuario)
        
        const report = await CursistaEspecializacaoController.createReport(specializationStudent, advisor, req.body)
        
        if(report instanceof CustomError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: report.message,
                errorName: report.name
            })
        }

        await NotificationRepository.create({
            login: advisor.login,
            mensagem: `${req.loginUsuario} ` + MESSAGES.NEW_MATERIAL,
            tipo: notificationType.PENDENCIA,
            chaveReferenciado: req.body.name,
            modeloReferenciado: ReferencedModel.PRACTICAL_REPORT
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: report
        })
    }

    /**
     * @route GET /specialization_student/my_practical_report
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico[]} data 
     */
    async getMyMaterials(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }       

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)

        const myMaterials = await specializationStudent.getMaterial()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: myMaterials
        })
    }

    /**
     * 
     * @route GET /specialization_student/practical_report_not_viewed
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico[]} data - Only materials that the student didn't check after advisor analisys
     */
    async getNotViewedMaterials(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)

        const materials = await specializationStudent.getMaterial({
            where: {
                visualizado_pelo_cursista: false
            }
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: materials
        })
    }

    /**
     * 
     * @route GET /specialization_student/practical_report/:name
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async getMaterial(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)

        const material = await SpecializationStudentRepository.getMaterial(specializationStudent, req.params.name)

        if (material.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.PRACTICAL_REPORT_NOT_FOUND + req.params.name,
                errorName: ErrorType.NOT_FOUND
            })
        }

        if(!(material[0].data_avaliacao == null)) {
            material[0].visualizado_pelo_cursista = true
            await material[0].save()
        }

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: material
        })
    }

    /**
     * 
     * @route POST /specialization_student/class/:name
     * @requires Authentication
     * 
     * @param {string} req.params.nome_turma - The class that the student will be part of
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async postCursaTurma(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)
        const classObject = await SpecializationDisciplineClassRepository.findByPk(req.params.name)

        if(classObject == null) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.CLASS_NOT_FOUND + req.params.name,
                errorName: ErrorType.NOT_FOUND
            })
        }

        if(await SpecializationStudentRepository.isInClass(specializationStudent, classObject)){
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.EXISTING_CLASS_SPECIALIZATIONSTUDENT_RELATIONSHIP,
                errorName: ErrorType.DUPLICATE_ENTRY
            })
        }

        await SpecializationStudentRepository.addClass(specializationStudent, classObject)
        const classes = await SpecializationStudentRepository.getClasses(specializationStudent)

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: classes
        })
    }

    /**
     * 
     * @route GET /specialization_student/my_classes
     * @requires Authentication
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data 
     */
    async getMinhasTurmas(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)

        const myClasses = await specializationStudent.getTurma()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: myClasses
        })
    }

    /**
     * 
     * @route POST /specialization_student/interest_in_discipline
     * @requires Authentication
     * 
     * @param {int} req.body.year - The year of the request 
     * @param {Object[]} req.body.disciplines - The list of the disciplines that the student is interested 
     * @param {string} req.body.disciplines.name 
     * @param {int} req.body.disciplines.preference - The higher the value, the greater the desire to join the class
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * @returns {object} data
     * @returns {object[]} data.success
     * @returns {string} data.success.message
     * @returns {object[]} data.fail
     * @returns {string} data.success.message - The error's message
     * @returns {string} data.success.name - The error's name
     * @returns {object[]} data.unexpectedError
     * @returns {string} data.unexpectedError.message
     */
    async postInteresseNaDisciplina(req, res){
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const specializationStudent = await SpecializationStudentRepository.findByPk(req.loginUsuario)
        const data = req.body

        const status = await CursistaEspecializacaoController.inserirDisciplinas(data, specializationStudent)
        
        if(status.fail.length === 0 && status.unexpectedError.length === 0) {
            const success = status.success
            return res.status(httpStatus.CREATED).json({
                error: false,
                success
            })
        }
        return res.status(httpStatus.BAD_REQUEST).json({
            error: true,
            data: status})
    }

    /**
     * 
     * @route POST /specialization_student/feedback
     * @requires Authentication
     * 
     * @param {string} req.body.message_topic - The topic of the feedback. It value must be one of the follow: 
     * 1 - "orientações"
     * 2 - "aulas moodle"
     * 3 - "horas práticas"
     * 4 - "questões administrativas"
     * 5 - "outros"
     * @param {string} req.body.message
     * @param {boolean} req.body.anonymous - Represents if an feedback is anonymous or not
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
     * 201 - CREATED
     * 401 - UNAUTHORIZED
     * 500 - INTERNAL_SERVER_ERROR
     * @returns {boolean} error
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {RelatorioPratico} data  
     */
    async postReclamation(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const { message_topic, message, anonymous } = req.body
        
        const reclamation = await OuvidoriaCursoEspecializacao.create({
            topico_mensagem: message_topic,
            mensagem: message,
            anonimo: anonymous,
            login: anonymous ? null : req.loginUsuario
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            reclamation
        })
    }

    /**
     * 
     * @requires Authentication
     * @route POST /specialization_student/guidance_report
     * 
     * @param {int} req.body.workload
     * @param {string} req.body.note
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be:
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
     * @returns {GuidanceReport} data
     */
    async postGuidanceReport(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const [student, advisor] = await CursistaEspecializacaoController.getEntities(req.loginUsuario)

        const report = await SpecializationStudentRepository.createGuidanceReport(student, req.body) 

        await NotificationRepository.create({
            login: advisor.login,
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
     * @route GET /specialization_student/guidance_report
     * 
     * RETORNO
     * @returns {int} httpStatus - It value might be:
     * 201 - SUCCESS
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

        const authorizationError = CursistaEspecializacaoController.verifyUserType([UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }     

        const student = await SpecializationStudentRepository.findByPk(req.loginUsuario)

        const report = await SpecializationStudentRepository.getGuidanceReport(student) 

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: report
        })
    }    
}

export default new CursistaEspecializacaoController()