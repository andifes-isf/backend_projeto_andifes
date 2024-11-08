import * as Yup from 'yup'

// Models
import AlunoIsF from '../../models/usuarios/alunoisf'
import Curso from '../../models/ofertacoletiva/curso'
import proeficienciaAlunoIsF from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'

// Controller
import usuarioController from './usuarioController'

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import UserTypes from '../../utils/userType/userTypes'
import CustomError from '../../utils/response/CustomError/CustomError'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import ErrorType from '../../utils/response/ErrorType/ErrorType'

class alunoIsFController {
    static verifyUserType(userType) {
        if(!(userType === UserTypes.ISF_STUDENT)){
            return new CustomError(
                MESSAGES.ACCESS_DENIED,
                ErrorType.UNAUTHORIZED_ACCESS
            )
        }
    }

    static async verifyExistingStudent(login) {
        const existingStudent = await AlunoIsF.findOne({
            where: {
                login: login
            }
        })

        if(existingStudent) {
            return new CustomError(
                `${login}` + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res, deInstituicao) {
        const existingStudent = await alunoIsFController.verifyExistingStudent(req.body.login)

        if (existingStudent) {
            return {
                error: true,
                student: existingStudent
            }
        }
        
        await usuarioController.post(req, res, UserTypes.ISF_STUDENT)
        
        const student = await AlunoIsF.create({
            login: req.body.login,
            deInstituicao: deInstituicao
        })

        return {
            error: false,
            student: student
        }
    }

    async get(_, res){
        const students = await AlunoIsF.findAll({
            include: [
                {
                    model: TurmaOC,
                    attributes: {
                        exclude: ['idTurma', 'idCurso', ]
                    },
                    include: {
                        model: Curso,
                        attributes: ['nome']
                    },
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        return res.status(httpStatus.SUCCESS).json(students)
    }

    static async verifyExistingProeficiency(login, language, level) {
        const existingProeficiency = await proeficienciaAlunoIsF.findOne({
            where: {
                login: login,
                idioma: language,
                nivel: level
            }
        })

        if(existingProeficiency) {
            return new CustomError(
                "Proeficiência" + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async postProeficiencia(req, res) {
        const authorizationError = alunoIsFController.verifyUserType(req.tipoUsuario)
        
        if (authorizationError) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const existingProeficiencyError = await alunoIsFController.verifyExistingProeficiency(req.loginUsuario, req.body.idioma, req.body.nivel)

        if (existingProeficiencyError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }
        
        const proeficiency = await proeficienciaAlunoIsF.create({
            login: req.loginUsuario,
            nivel: req.body.nivel,
            idioma: req.body.idioma,
            comprovante: req.body.comprovante
        })

        return res.status(201).json({
            error: false,
            proeficiency
        })
    }

    async getMinhaProeficiencia(req, res) {
        const authorizationError = alunoIsFController.verifyUserType(req.tipoUsuario)
    
        if (authorizationError) {
            return res.status(401).json({
                error: true,
                message: authorizationError.message,
                errorName: authorizationError.name
            })
        }

        const proeficiencies = await proeficienciaAlunoIsF.findAll({
            where: {
                login: req.loginUsuario
            }
        })

        return res.status(200).json({
            error: false,
            proeficiencies
        })
    }
}

export default new alunoIsFController()