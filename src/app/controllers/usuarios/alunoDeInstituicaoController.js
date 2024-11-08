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

class alunoDeinstituicaoController {
    static verifyUserType(userType) {
        if(!(userType === UserTypes.ISF_STUDENT)){
            return new CustomError(
                MESSAGES.ACCESS_DENIED,
                ErrorType.UNAUTHORIZED_ACCESS
            )
        }
    }

    static async verifyExistingInstitutionStudent(id) {
        const student = await AlunoDeInstituicao.findByPk(id)

        console.log(student)

        if(student) {
            console.log(MESSAGES.EXISTING_INSTITUTION_STUDENT)
            return new CustomError(
                MESSAGES.EXISTING_INSTITUTION_STUDENT + student.login,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingStudent = await alunoDeinstituicaoController.verifyExistingInstitutionStudent(req.body.nDocumento)
        
        if (existingStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await alunoIsFController.post(req, res, 1)

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

    static async verifyExistingInstitution(institutionId) {
        const institution = await InstituicaoEnsino.findByPk(institutionId)

        if(!institution) {
            return new CustomError(
                `Instituição ${institutionId}` + MESSAGES.NOT_FOUND,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

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
                existingRegistrantion.comprovante + MESSAGES.ALREADY_IN_SYSTEM,
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

    async postInstituicao(req, res){
        const authorizationError = alunoDeinstituicaoController.verifyUserType(req.tipoUsuario)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const existingInstitution = await alunoDeinstituicaoController.verifyExistingInstitution(req.params.idInstituicao)

        if (existingInstitution) {
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
        const authorizationError = alunoDeinstituicaoController.verifyUserType(req.tipoUsuario)
        
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
        const authorizationError = alunoDeinstituicaoController.verifyUserType(req.tipoUsuario)
        
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