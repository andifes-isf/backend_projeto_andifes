import * as Yup from 'yup'

// Models
import AlunoEstrangeiro from '../../models/usuarios/alunoestrangeiro'
import alunoIsFController from './alunoIsFController'
import AlunoIsF from '../../models/usuarios/alunoisf'
// import Usuario from '../../models/usuarios/usuario'

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import CustomError from '../../utils/response/CustomError/CustomError'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import ErrorType from '../../utils/response/ErrorType/ErrorType'

class alunoEstrangeiroController  {
    // Endpoints

    /**
     *
     * @route POST /foreign_student
     * 
     * @param {string} req.body.home_country - User's homes country
     * @param {int} req.body.register - User's register (not specified because each country has it's own personal register)
     * @param {int} req.body.type - User's register's type
     * @param {string} req.body.code - User's register code
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
     * @returns {AlunoEstrangeiro} data
     */  
    async post(req, res) {
        const existingStudent = await alunoEstrangeiroController.verifyExistingObject(AlunoEstrangeiro, req.body.login, MESSAGES.EXISTING_FOREIGN_STUDENT)
        
        if (existingStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingStudent.message,
                errorName: existingStudent.name
            })
        }

        const { error, student } = await alunoEstrangeiroController.postIsFStudent(req, res, 0)

        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: student.message,
                errorName: student.name
            })
        }

        const { home_country, register, type, login, code } = req.body

        const foreignStudent = await AlunoEstrangeiro.create({
            home_country: home_country,
            register: register,
            type: type,
            login: login,
            code: code
        })
    
        return res.status(httpStatus.CREATED).json({
            error: false,
            foreignStudent
        })
    }

    /**
    *
    * @route GET /foreign_student
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
    * @returns {AlunoEstrangeiro[]} data
    */
    async get(_, res) {
        const students = await AlunoEstrangeiro.findAll({
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

        return res.status(httpStatus.SUCCESS).json({
            error: false,
            students
        })
    }
}

export default new alunoEstrangeiroController()