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