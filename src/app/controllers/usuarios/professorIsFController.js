// Precisa, no futuro, trocar esse InstituicaoEnsino pelo InstitutionRepository

import usuarioController from "../../user/usuarioController"

// Repositories
import IsFTeacherRepository from "../../repositories/user/IsFTeacherRepository"
import InstitutionRepository from "../../repositories/institution/InstitutionRepository"

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from "../../utils/response/CustomError/CustomError"
import httpStatus from "../../utils/response/httpStatus/httpStatus"
import ErrorType from "../../utils/response/ErrorType/ErrorType"


class ProfessorIsFController extends usuarioController {
    // Auxiliar Functions

    static async postIsFTeacher(req, res, specialization_student) {
        const existingTeacher = await ProfessorIsFController.verifyExistingObject(IsFTeacherRepository, req.body.login, MESSAGES.EXISTING_ISF_TEACHER)

        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }

        const { error, user} = await ProfessorIsFController.postUser(req, res, specialization_student ? UserTypes.CURSISTA : UserTypes.ISF_TEACHER)

        if (error) {
            return {
                error: true,
                teacher: user
            }
        }

        const teacher = await IsFTeacherRepository.create({
            login: req.body.login,
            poca: req.body.poca,
            start: req.body.start,
            end: req.body.end,
            specialization_student: specialization_student
        })

        return {
            error: false,
            teacher: teacher
        }
    }

    static async verifyExistingProeficiency(login, language, level) {
        const existingProeficiency = await IsFTeacherRepository.verifyExistingProeficiency(login, language, level)

        if(existingProeficiency) {
            return new CustomError(
                MESSAGES.EXISTING_PROEFICIENCY + language + " " +  level,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingRegistration(data) {
        const existingRegistrantion = await IsFTeacherRepository.findOneDocument(data)

        if(existingRegistrantion) {
            return new CustomError(
                MESSAGES.EXISTING_INSTITUTION_USER_RELATIONSHIP + data.institutionId,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async closeRegistration(login) {
        const registration = await IsFTeacherRepository.findCurrentDocument(login)

        if (registration != null) {
            registration.termino = new Date().toISOString().split("T")[0]
            InstitutionRepository.save(registration)
        }
    }

    // Endpoints

    /**
    *
    * @route GET /isf_teacher 
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 200 - SUCCESS
    * 500 - INTERNAL_SERVER_ERROR
    * @returns {boolean} error
    * 
    * if return an error
    * @returns {string} message - error's message
    * @returns {string} errorName - error's name
    * 
    * if return successfully
    * @returns {ProfessorIsF} data
    */
    async get(_, res){
        const teachers = await IsFTeacherRepository.findAll()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: teachers
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /isf_teacher/proeficiency
    * 
    * @param {char[2]} level - The level of the proeficiency. 
    * For japanese, it should be used N5 -> N1
    * For other languages, it should be used A1 -> C2
    * @param {string} language - Indicates the language of the proeficiency. It must be one of the follow:
    * 1 - "ingles"
    * 2 - "portugues",
    * 3 - "alemao"
    * 4 - "frances"
    * 5 - "italiano"
    * 6 - "espanhol"
    * 7 - "japones"
    * @param {string} document - Document that proves the proeficiency
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
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
    * @returns {ProeficienciaProfessorIsF} data
    */  
    async postProeficiencia(req, res) {
        const userType = req.tipoUsuario
        
        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        } 

        const login = req.loginUsuario
        
        const { language, level, document } = req.body

        const existingProeficiencyError = await ProfessorIsFController.verifyExistingProeficiency(login, language, level)

        if(existingProeficiencyError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await IsFTeacherRepository.createProeficiency(login, level, language, document)

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: proeficiency
        })  
    }

    /**
    *
    * @requires Authentication
    * @route GET /isf_teacher/my_proeficiency
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
    * @returns {ProeficienciaProfessorIsF[]} data
    */
    async getMinhaProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await IsFTeacherRepository.findAllProeficiencies(req.loginUsuario)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: proeficiencies
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /specialization_student/institution/:institutionId
    * 
    * @param {int} req.params.institutionId
    * @param {date} req.body.start
    * @param {string} req.body.document
    * 
    * RETORNO
    * @returns {int} httpStatus - The value might be:
    * 201 - CREATED
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
    * @returns {ComprovanteProfessorInstituicao} data
    */
    async postInstituicao(req, res) { 
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const data = {
            institutionId: req.params.institutionId,
            login: req.loginUsuario,
            start: req.body.start,
            document: req.body.document
        }

        const nonExistingInstitution = await ProfessorIsFController.verifyNonExistingObject(InstitutionRepository, data.institutionId, MESSAGES.EXISTING_INSTITUTION)

        if(nonExistingInstitution) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.INSTITUTION_NOT_FOUND + data.institutionId,
                errorName: ErrorType.NOT_FOUND
            })
        }
        
        
        const existingRegistration = await ProfessorIsFController.verifyExistingRegistration(data)
        
        if (existingRegistration) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }
        
        await ProfessorIsFController.closeRegistration(data.login)
        const registration = await IsFTeacherRepository.joinInstitution(data)

        return res.status(httpStatus.CREATED).json({
            error: false,
            data: registration
        })    
    }

    /**
     *
     * @requires Authentication
     * @route GET /isf_teacher/my_institutions
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
     * @returns {ComprovanteProfessorInstituicao[]} data
     * 
     * @returns 
     */
    async getMinhasInstituicoes(req, res){
        const userType = req.tipoUsuario

        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registrations = await IsFTeacherRepository.findAllDocuments(req.loginUsuario)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: registrations
        })
    }

    /**
     *
     * @requires Authentication
     * @route GET /isf_teacher/current_institution
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
     * @returns {ComprovanteProfessorInstituicao} data
     * 
     * @returns 
     */
    async getInstituicaoAtual(req, res){
        const userType = req.tipoUsuario
        
        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await IsFTeacherRepository.findCurrentDocument(req.loginUsuario)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            data: registration
        })
    }
}

export default ProfessorIsFController