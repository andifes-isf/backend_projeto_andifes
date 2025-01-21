// Models
import AlunoGraduacao from "../../models/usuarios/alunograduacao";
import Usuario from "../../models/usuarios/usuario";
import ProfessorIsF from "../../models/usuarios/professorisf";
import ProfessorIsFController from './professorIsFController'

// Utils
import MESSAGES from "../../utils/response/messages/messages_pt";
import CustomError from "../../utils/response/CustomError/CustomError";
import ErrorType from "../../utils/response/ErrorType/ErrorType";
import httpStatus from "../../utils/response/httpStatus/httpStatus";

class AlunoGraduacaoController extends ProfessorIsFController{

    /**
    *
    * @route POST /graduation_student
    * 
    * @param {string} req.body.login
    * 
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
    * @returns {AlunoGraduacao} data
    */
    async post(req, res) {
        const existingGraduationStudent = await AlunoGraduacaoController.verifyExistingObject(AlunoGraduacao, req.body.login, MESSAGES.EXISTING_GRADUATION_STUDENT)

        if (existingGraduationStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingGraduationStudent.message,
                errorName: existingGraduationStudent.name
            })
        }

        const { error, teacher } = await AlunoGraduacaoController.postIsFTeacher(req, res, 0)
        
        if (error) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: teacher.message,
                errorName: teacher.name
            })
        }

        const graduationStudent = await AlunoGraduacao.create({
            login: req.body.login
        })

        return res.status(httpStatus.CREATED).json({
            error: false,
            graduationStudent
        })

    }

    /**
     * 
     * @route GET /graduation_student
     * 
     * @returns {int} httpStatus - The value might be:
     * 200 - SUCCESS
     * 500 - INTERNAL_SERVER_ERROR
     * 
     * if return an error
     * @returns {string} message - error's message
     * @returns {string} errorName - error's name
     * 
     * if return successfully
     * @returns {AlunoGraduacao} data
     */
    async get(_, res){
        const graduationStudents = await AlunoGraduacao.findAll({
            include: [
                {
                    model: ProfessorIsF,
                    where: {
                        cursista: false
                    }
                }
            ]
        })
        
        return res.status(httpStatus.SUCCESS).json({
            error: false,
            graduationStudents
        })
    }
}

export default new AlunoGraduacaoController()