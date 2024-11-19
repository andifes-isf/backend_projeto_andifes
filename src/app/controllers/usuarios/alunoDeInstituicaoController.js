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
            nDocumento: req.body.nDocumento,
            cargo: req.body.cargo,
            areaAtuacao: req.body.areaAtuacao,
            login: req.body.login
        })
    
        return res.status(httpStatus.CREATED).json({
            error: false,
            institutionStudent
        })
    }

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

        const existingInstitution = await alunoDeinstituicaoController.verifyExistingObject(InstituicaoEnsino, req.params.idInstituicao, MESSAGES.EXISTING_INSTITUTION)

        if (!existingInstitution) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingInstitution.message,
                errorName: existingInstitution.name
            })
        }

        const existingRegistration = await alunoDeinstituicaoController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        if (existingRegistration) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }

        await alunoDeinstituicaoController.closeRegistration(req.loginUsuario, req.params.idInstituicao)
        
        const registration = await ComprovanteAlunoInstituicao.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            comprovante: req.body.comprovante
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            registration
        })  
    }

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