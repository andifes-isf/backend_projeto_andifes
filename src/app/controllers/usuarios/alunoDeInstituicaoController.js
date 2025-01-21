import * as Yup from 'yup'

// Models
import AlunoDeInstituicao from '../../models/usuarios/alunodeinstituicao'
import AlunoIsF from '../../models/usuarios/alunoisf'
import ComprovanteAlunoInstituicao from '../../models/usuario_pertence_instituicao/comprovantealunoinstituicao'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import Usuario from '../../models/usuarios/usuario'

// Controller
import alunoIsFController from './alunoIsFController'

// Utils
import { Op } from 'sequelize'
import CustomError from '../../utils/response/CustomError/CustomError'
import MESSAGES from '../../utils/response/messages/messages_pt'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import UserTypes from '../../utils/userType/userTypes'
import ErrorType from '../../utils/response/ErrorType/ErrorType'

class alunoDeinstituicaoController extends alunoIsFController {
    // Auxiliar Functions

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: login,
                idInstituicao: institutionId,
                inicio: begin
            }
        })

        if(existingRegistrantion) {
            return new CustomError(
                MESSAGES.EXISTING_INSTITUTION_USER_RELATIONSHIP + institutionId,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async closeRegistration(login) {
        const registration = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: login,
                termino: {
                    [Op.is]: null
                }
            }
        })

        registration.termino = new Date().toISOString().split("T")[0]
        registration.save()
    }


    // Endpoints

    /**
    *
    * @route POST /institution_student
    * 
    * @param {string} req.body.register_number - User's register number
    * @param {int} req.body.position - I don't know
    * @param {int} req.body.activity_area - Indicates the student's area
    * 1 - 'ciencias exatas e da terra'
    * 2 - 'ciencias biologicas'
    * 3 - 'engenharia/tecnologia'
    * 4 - 'ciencias da saude'
    * 5 - 'ciencias agrarias'
    * 6 - 'ciencias sociais'
    * 7 - 'ciencias humanas'
    * 8 - 'linguistica'
    * 9 - 'letras e artes'
    * 10 - 'prefiro nao dizer'
    * @param {string} req.body.login - User's login 
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
    * @returns {AlunoDeInstituicao} data
    */  
    async post(req, res) {
        const existingStudent = await alunoDeinstituicaoController.verifyExistingObject(AlunoDeInstituicao, req.body.login, MESSAGES.EXISTING_INSTITUTION_STUDENT)
        
        if (existingStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await alunoIsFController.postIsFStudent(req, res, 1)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const institutionStudent = await AlunoDeInstituicao.create({
            register_number: req.body.register_number,
            position: req.body.position,
            activity_area: req.body.activity_area,
            login: req.body.login
        })
    
        return res.status(httpStatus.CREATED).json({
            error: false,
            institutionStudent
        })
    }

    /**
    *
    * @route GET /institution_student
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
    * @returns {AlunoDeInstituicao[]} data
    */
    async get(_, res) {
        const students = await AlunoDeInstituicao.findAll({
            include: [
                {
                    model: AlunoIsF,
                    attributes: {
                        exclude: ['login']
                    },
                    include: [{
                        model: Usuario,
                        attributes: {
                            exclude: ['login', 'senha_encriptada', 'ativo', 'tipo']
                        }
                    }]
                },    
                {
                    model: InstituicaoEnsino,
                    as: "institution",
                    attributes: {
                        exclude: ['idInstituicao']
                    },
                    through: {
                        attributes: {
                            exclude: ['login', 'idInstituicao'],
                            include: ['inicio']
                        }
                    }
                }
            ]
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            students
        })
    }

    /**
    *
    * @requires Authentication
    * @route POST /institution_student/institution/:institutionId
    * 
    * 
    * @param {int} req.params.institutionId - Institution's id
    * @param {string} req.loginUsuario - User's logged login
    * @param {inicio} req.body.inicio - Date the student started college
    * @param {string} req.body.comprovante - Registration's proof
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
    * @returns {ComprovanteAlunoInstituicao} data
    */  
    async postInstituicao(req, res){
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([UserTypes.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        // Seria bom ver como mudar para que fosse passado o nome, ou sigla, da instituição, ao invés do Id dela

        const existingInstitution = await alunoDeinstituicaoController.verifyExistingObject(InstituicaoEnsino, req.params.institutionId, MESSAGES.EXISTING_INSTITUTION)

        if (!existingInstitution) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingInstitution.message,
                errorName: existingInstitution.name
            })
        }

        const existingRegistration = await alunoDeinstituicaoController.verifyExistingRegistration(req.loginUsuario, req.params.institutionId, req.body.inicio)

        if (existingRegistration) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }

        await alunoDeinstituicaoController.closeRegistration(req.loginUsuario, req.params.institutionId)
        
        const registration = await ComprovanteAlunoInstituicao.create({
            idInstituicao: req.params.institutionId,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            comprovante: req.body.comprovante
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            registration
        })  
    }

    /**
     * 
     * @Authentication
     * @route GET /institution_student/my_institutions
     * 
     * @param {string} req.body.loginUsuario - User's logged login
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
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
     * @returns {ComprovanteAlunoInstituicao} data
     */
    async getMinhasInstituicoes(req, res){
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([UserTypes.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registrations = await ComprovanteAlunoInstituicao.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            registrations
        })
    }

    /**
     * 
     * @Authentication
     * @route GET /institution_student/current_institution
     * 
     * @param {string} req.body.loginUsuario - User's logged login
     * 
     * RETORNO
     * @returns {int} httpStatus - The value might be:
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
     * @returns {ComprovanteAlunoInstituicao} data
     */
    async getInstituicaoAtual(req, res){
        const userType = req.tipoUsuario

        const authorizationError = alunoIsFController.verifyUserType([UserTypes.ISF_STUDENT], userType)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: req.loginUsuario,
                termino: {
                    [Op.is]: null
                }
            }
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            registration
        })
    }
}

export default new alunoDeinstituicaoController()