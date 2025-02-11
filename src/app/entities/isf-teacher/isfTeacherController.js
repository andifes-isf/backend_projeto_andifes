import usuarioController from "../../entities/user/usuarioController"

// Repositories
import IsFTeacherRepository from "./repository/IsFTeacherRepository"
import InstitutionRepository from "../../repositories/institution/InstitutionRepository"

// Utils
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from "../../utils/response/CustomError/CustomError"
import httpStatus from "../../utils/response/httpStatus/httpStatus"
import ErrorType from "../../utils/response/ErrorType/ErrorType"
import AuxiliarFunctions from '../../utils/functions'

// Use Cases
import CreateIsFTeacher from "./use-cases/CreateIsFTeacher"
import GetIsFTeacher from "./use-cases/GetIsFTeacher"
import PostProeficiency from "./use-cases/PostProeficiency"
import GetMyProeficiency from "./use-cases/GetMyProeficiency"
import PostInstituicao from "./use-cases/PostInstituicao"
import GetMyInstitutions from "./use-cases/GetMyInstitutions"
import GetCurrentInstitution from "./use-cases/GetCurrentInstitution"


class ProfessorIsFController {
    // Auxiliar Functions

    async postIsFTeacher(req, res, specialization_student) {
        const { error, result } = await CreateIsFTeacher.exec({...req.body, specialization_student}, IsFTeacherRepository)
        if (error) {
            
            return {
                error: true,
                result
            }
        }


        return {
            error: false,
            result
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
        const teachers = await GetIsFTeacher.exec(IsFTeacherRepository)

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
        
        const authorizationError = AuxiliarFunctions.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        } 

        const result = await PostProeficiency.exec({login: req.loginUsuario, ...req.body}, IsFTeacherRepository)

        if(result.error) {
            return res.status(httpStatus.BAD_REQUEST).json(result)
        }

        return res.status(httpStatus.CREATED).json(result)  
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
        const result = await GetMyProeficiency.exec({
            login: req.loginUsuario,
            type: req.tipoUsuario
        }, IsFTeacherRepository)

        if (result.error) {
            return res.status(httpStatus.UNAUTHORIZED).json(result)
        }

        return res.status(httpStatus.SUCCESS).json(result)
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
        const result = await PostInstituicao.exec({
            ...req.body,
            ...req.params, 
            type: req.tipoUsuario, 
            login: req.loginUsuario
        }, IsFTeacherRepository, InstitutionRepository)

        if (result.error) {
            if (result.name = ErrorType.UNAUTHORIZED_ACCESS) {
                return res.status(httpStatus.UNAUTHORIZED).json(result)
            }
            return res.status(httpStatus.BAD_REQUEST).json(result)
        }

        return res.status(httpStatus.CREATED).json(result)    
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
        const result = await GetMyInstitutions.exec({
            login: req.loginUsuario,
            type: req.tipoUsuario
        }, IsFTeacherRepository)

        if (result.error) {
            return res.status(httpStatus.UNAUTHORIZED).json(result)
        }

        return res.status(httpStatus.SUCCESS).json(result)
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
        const result = await GetCurrentInstitution.exec({
            login: req.loginUsuario,
            type: req.tipoUsuario
        }, IsFTeacherRepository)

        if (result.error) {
            return res.status(httpStatus.UNAUTHORIZED).json(result)
        }
        return res.status(httpStatus.SUCCESS).json(result)
    }
}

export default ProfessorIsFController