import * as Yup from 'yup'

// Models
import AlunoEstrangeiro from '../../models/usuarios/alunoestrangeiro'
import alunoIsFController from './alunoIsFController'
import AlunoIsF from '../../models/usuarios/alunoisf'
import Usuario from '../../models/usuarios/usuario'

// Utils
import MESSAGES from '../../utils/messages/messages_pt'
import CustomError from '../../utils/CustomError/CustomError'
import httpStatus from '../../utils/httpStatus/httpStatus'
import ErrorType from '../../utils/response/ErrorType/ErrorType'

class alunoEstrangeiroController {
    static async verifyExistingStudent(login) {
        const existingStudent = await AlunoEstrangeiro.findOne({
            where: {
                login: login
            }
        })

        if(existingStudent) {
            return new CustomError(
                `${existingStudent.login}` + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingStudent = await alunoEstrangeiroController.verifyExistingStudent(req.body.login)
        
        if (existingStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await alunoIsFController.post(req, res, 0)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const foreignStudent = await AlunoEstrangeiro.create({
            paisOrigem: req.body.paisOrigem,
            comprovante: req.body.comprovante,
            tipo: req.body.tipo,
            login: req.body.login,
            codigo: req.body.codigo
        })
    
        return res.status(httpStatus.CREATED).json({
            error: false,
            foreignStudent
        })
    }

    async get(_, res) {
        const alunos = await AlunoEstrangeiro.findAll({
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
                }
            ]
        })

        return res.status(httpStatus.SUCCESS).json(alunos)
    }
}

export default new alunoEstrangeiroController()