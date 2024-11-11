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

class alunoIsFController extends usuarioController {
    // Auxiliar Functions 

    static async postIsFStudent(req, res, deInstituicao) {
        const existingStudent = await alunoIsFController.verifyExistingObject(AlunoIsF, req.body.login, MESSAGES.EXISTING_ISF_STUDENT)

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

        const student = await AlunoIsF.create({
            login: req.body.login,
            deInstituicao: deInstituicao
        })

        return {
            error: false,
            student: student
        }
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
                MESSAGES.EXISTING_PROEFICIENCY + language + " " +  level,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    // Endpoints

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

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            students
        })
    }

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
        const { language, level, document } = req.body

        const existingProeficiencyError = await alunoIsFController.verifyExistingProeficiency(userLogin, language, level)

        if (existingProeficiencyError) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingProeficiencyError.message,
                errorName: existingProeficiencyError.name
            })
        }

        const proeficiency = await proeficienciaAlunoIsF.create({
            login: userLogin,
            nivel: level,
            idioma: language,
            comprovante: document
        })

        return res.status(201).json({
            error: false,
            proeficiency
        })
    }

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

export default alunoIsFController