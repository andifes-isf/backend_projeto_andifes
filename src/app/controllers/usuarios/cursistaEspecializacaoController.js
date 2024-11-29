import { Sequelize } from "sequelize"

// Modelscursistacursaturmaespecializacao"
import InteresseNaDisciplina from '../../models/curso_especializacao/InteresseNaDisciplina'
import OuvidoriaCursoEspecializacao from "../../models/curso_especializacao/ouvidoria_curso_especializacao"

// Controllers
import ProfessorIsFController from './professorIsFController'

// Repositories
import PracticalReportRepository from "../../repositories/specialization_course/PracticalReportRepository"
import NotificationRepository from "../../repositories/utils/NotificationRepository"
import SpecializationStudentRepository from "../../repositories/usuarios/SpecializationStudentRepository"
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
import CursistaEspecializacao from "../../models/usuarios/cursistaespecializacao"

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

        return await SpecializationStudentRepository.createReport(specializationStudent, {
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
        const existingDiscipline = await SpecializationDisciplineRepository.findOne(discipline.nomeDisciplina)

        if (!existingDiscipline) {
            return new CustomError(
                MESSAGES.DISCIPLINE_NOT_FOUND + discipline.nomeDisciplina,
                ErrorType.NOT_FOUND
            )
        }
        
        const existingInterest = await InteresseNaDisciplina.findOne({
            where: {
                login: specializationStudent.login,
                nomeDisciplina: discipline.nomeDisciplina,
                ano: year
            }
        })

        if (existingInterest) {
            return new CustomError(
                MESSAGES.EXISTING_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + discipline.nomeDisciplina,
                ErrorType.DUPLICATE_ENTRY
            )
        }

        await specializationStudent.createInteresse({
            ano: year,
            nomeDisciplina: discipline.nomeDisciplina,
            preferencia: discipline.preferencia
        })
    }

    static async inserirDisciplinas(data, specializationStudent){
        const disciplines = data.interesse
        const year = data.ano
        
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
                discipline: discipline.nomeDisciplina
            }
        })
        
        const results = await Promise.allSettled(promises)
        let success = []
        let fail = []
        let unexpectedError = []

        results.forEach((result) => {
            if (result.value.error === false) {
                success.push(MESSAGES.NEW_SPECIALIZATIONSTUDENT_DISCIPLINE_INTEREST + result.value.discipline)
            } else if (result.value.error === true) {
                fail.push([result.value.errorInfo.message, result.value.errorInfo.name])
            } else {
                unexpectedError.push(`Erro inesperado:`, result.reason)
            }
        })

        return { success: success, fail: fail, unexpectedError: unexpectedError}
    }

    // Endpoints
    
    /**
    *
    * @param {string} req.body.login
    * @param {string} req.body.namestudent
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
    * @returns {object} httpStatus
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {CursistaEspecializacao} specializationStudent
    * 
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
            specializationStudent
        })
    }

    async get(_, res){
        const specializationStudents = await SpecializationStudentRepository.findAll()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            specializationStudents
        })
    }
    
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
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
            report
        })
    }

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
            myMaterials
        })
    }

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
            materials
        })
    }

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

        const [specializationStudent, advisor] = await CursistaEspecializacaoController.getEntities(req.loginUsuario)

        const material = await SpecializationStudentRepository.getMaterial(specializationStudent, req.params.nome)

        if (material.length === 0) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.PRACTICAL_REPORT_NOT_FOUND + req.params.nome,
                errorName: ErrorType.NOT_FOUND
            })
        }

        if(!(material[0].data_avaliacao == null)) {
            material[0].visualizado_pelo_cursista = true
            await material[0].save()
        }

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            material
        })
    }

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
        const classObject = await SpecializationDisciplineClassRepository.findByPk(req.params.nome_turma)

        if(classObject == null) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.CLASS_NOT_FOUND + req.params.nome_turma,
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
            classes
        })
    }

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
            myClasses
        })
    }

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
            status})
    }

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
}

export default new CursistaEspecializacaoController()