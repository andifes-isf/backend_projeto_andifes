import { Sequelize } from "sequelize";
import ProfessorIsF from "../../models/usuarios/professorisf";
import Usuario from "../../models/usuarios/usuario";
import ComprovanteProfessorInstituicao from '../../models/usuario_pertence_instituicao/comprovanteprofessorinstituicao'
import InstituicaoEnsino from "../../models/instituicao/instituicaoensino";
import proeficienciaProfessorIsF from '../../models/proeficiencia/proeficienciaprofessorisf'
import usuarioController from "./usuarioController";

// Utils
import { Op } from 'sequelize'
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from "../../utils/response/CustomError/CustomError";
import httpStatus from "../../utils/response/httpStatus/httpStatus";
import ErrorType from "../../utils/response/ErrorType/ErrorType";


class ProfessorIsFController extends usuarioController {
    // Auxiliar Functions

    static async postIsFTeacher(req, res, specialization_student) {
        const existingTeacher = await ProfessorIsFController.verifyExistingObject(ProfessorIsF, req.body.login, MESSAGES.EXISTING_ISF_TEACHER)

        if (existingTeacher) {
            return {
                error: true,
                teacher: existingTeacher
            }
        }
        
        const { error, user} = await usuarioController.postUser(req, res, specialization_student ? UserTypes.CURSISTA : UserTypes.ISF_TEACHER)

        if (error) {
            return {
                error: true,
                teacher: user
            }
        }

        const teacher = await ProfessorIsF.create({
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
        const existingProeficiency = await proeficienciaProfessorIsF.findOne({
            where: {
                login: login,
                idioma: language,
                nivel: level
            }
        })

        if(existingProeficiency) {
            return new CustomError(
                MESSAGES.EXISTING_PROEFICIENCY + language + " " +  level,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    static async verifyExistingRegistration(login, institutionId, begin) {
        const existingRegistrantion = await ComprovanteProfessorInstituicao.findOne({
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
        const registration = await ComprovanteProfessorInstituicao.findOne({
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

    async get(_, res){
        const teachers = await ProfessorIsF.findAll({
            include: [
                {
                    model: Usuario,
                    attributes: {
                        include: [
                            [Sequelize.fn('CONCAT_WS', ' ', Sequelize.col('Usuario.nome'), Sequelize.col('Usuario.sobrenome')), 'nomeCompleto'],
                            [Sequelize.fn('CONCAT_WS', '@', Sequelize.col('nomeEmail'), Sequelize.col('dominio')), 'email']
                        ],
                        exclude: ['login', 'senha_encriptada', 'ativo', 'tipo', 'sobrenome', 'dominio', 'nomeEmail']
                    }
                },
                {
                    model: InstituicaoEnsino,
                    attributes: {
                        exclude: ['idInstituicao']
                    },
                    through: {
                        attributes: ['inicio']
                    },
                }
            ],
            logging: console.log
        })
        
        return res.status(httpStatus.SUCCESS).json({
            error: false,
            teachers
        })
    }

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

        const userLogin = req.loginUsuario
        const { language, level, document } = req.body

        const existingProeficiencyError = await ProfessorIsFController.verifyExistingProeficiency(userLogin, language, level)

        if(existingProeficiencyError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await proeficienciaProfessorIsF.create({
            login: userLogin,
            nivel: level,
            idioma: language,
            comprovante: document
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            proeficiency
        })  
    }

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

        const proeficiencies = await proeficienciaProfessorIsF.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            proeficiencies
        })
    }

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

        const existingInstitution = await ProfessorIsFController.verifyExistingObject(InstituicaoEnsino, req.params.idInstituicao, MESSAGES.EXISTING_INSTITUTION)

        if(!existingInstitution) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: MESSAGES.INSTITUTION_NOT_FOUNDED + req.params.idInstituicao,
                errorName: ErrorType.NOT_FOUND
            })
        }

        const existingRegistration = await ProfessorIsFController.verifyExistingRegistration(req.loginUsuario, req.params.idInstituicao, req.body.inicio)

        if (existingRegistration) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingRegistration.message,
                errorName: existingRegistration.name
            })
        }

        await ProfessorIsFController.closeRegistration(req.loginUsuario, req.params.idInstituicao)

        const registration = await ComprovanteProfessorInstituicao.create({
            idInstituicao: req.params.idInstituicao,
            login: req.loginUsuario,
            inicio: req.body.inicio,
            termino: req.body.termino || null,
            comprovante: req.body.comprovante
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            registration
        })    
    }

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

        const registrations = await ComprovanteProfessorInstituicao.findAll({
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

        const authorizationError = ProfessorIsFController.verifyUserType([UserTypes.ISF_TEACHER, UserTypes.CURSISTA], userType)

        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const registration = await ComprovanteProfessorInstituicao.findOne({
            where: {
                login: req.loginUsuario,
                termino: {
                    [Op.is]: null
                }
            }
        })

        return res.status(httpStatus.SUCCESS).json(registration)
    }
}

export default ProfessorIsFController