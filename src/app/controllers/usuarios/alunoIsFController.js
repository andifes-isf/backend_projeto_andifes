import * as Yup from 'yup'

// Repository
import IsfStudentRepository from '../../repositories/user/IsfStudentRepository'

// Controller
import usuarioController from "../../user/usuarioController"

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import UserTypes from '../../utils/userType/userTypes'
import CustomError from '../../utils/response/CustomError/CustomError'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import ErrorType from '../../utils/response/ErrorType/ErrorType'

class alunoIsFController extends usuarioController {
    // Auxiliar Functions 

    static async postIsFStudent(req, res, from_institution) {
        const existingStudent = await alunoIsFController.verifyExistingObject(IsfStudentRepository, req.body.login, MESSAGES.EXISTING_ISF_STUDENT)

        if (existingStudent) {
            return {
                error: true,
                student: existingStudent
            }
        }
        
        const { error, user } = await alunoIsFController.postUser(req, res, UserTypes.ISF_STUDENT)
        
        if (error) {
            return {
                error: true,
                student: user
            }
        }

        const student = await IsfStudentRepository.create({
            login: req.body.login,
            from_institution: from_institution
        })

        return {
            error: false,
            student: student
        }
    }

    static async verifyExistingProeficiency(data) {
        const existingProeficiency = await IsfStudentRepository.findOneProeficiency(data)

        if(existingProeficiency) {
            return new CustomError(
                MESSAGES.EXISTING_PROEFICIENCY + data.language + " " + data.data.level,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    // Endpoints

    /**
    *
    * @route GET /isf_student
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
    * @returns {AlunoIsF} data
    */
    async get(_, res){
        const students = await IsfStudentRepository.findAll()

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            students
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /isf_student/proeficiency
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
    * @returns {proeficienciaAlunoIsF} data
    */  
    async postProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([UserTypes.ISF_STUDENT], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const userLogin = req.loginUsuario
        const data = {
            userLogin = userLogin,
            language,
            level,
            document
        } = req.body

        const existingProeficiencyError = await alunoIsFController.verifyExistingProeficiency(data)

        if (existingProeficiencyError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await IsfStudentRepository.createProeficiency(data)

        return res.status(httpStatus.CREATED).json({
            error: false,
            proeficiency
        })
    }

    /**
    *
    * @requires Authentication
    * @route GET /isf_student/my_proeficiency
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
    * @returns {proeficienciaAlunoIsF[]} data
    */
    async getMinhaProeficiencia(req, res) {
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([UserTypes.ISF_STUDENT], userType)
    
        if (authorizationError) {
            return res.status(401).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await IsfStudentRepository.findAllProeficiencyForStudent(req.loginUsuario)

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            proeficiencies
        })
    }
}

export default alunoIsFController