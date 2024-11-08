// Models
import AlunoGraduacao from "../../models/usuarios/alunograduacao";
import Usuario from "../../models/usuarios/usuario";
import ProfessorIsF from "../../models/usuarios/professorisf";
import ProfessorIsFController from './professorIsFController'

// Utils
import MESSAGES from "../../utils/messages/messages_pt";
import CustomError from "../../utils/response/CustomError/CustomError";
import ErrorType from "../../utils/response/ErrorType/ErrorType";
import httpStatus from "../../utils/response/httpStatus/httpStatus";

class AlunoGraduacaoController {
    static async verifyExistingGraduationStudent(login) {
        const existingGraduationStudent = await AlunoGraduacao.findOne({
            where: {
                login: login
            }
        })

        if(existingGraduationStudent) {
            return new CustomError(
                `${existingGraduationStudent.login} ` + MESSAGES.ALREADY_IN_SYSTEM,
                ErrorType.DUPLICATE_ENTRY
            )
        }
    }

    async post(req, res) {
        const existingGraduationStudent = await AlunoGraduacaoController.verifyExistingGraduationStudent(req.body.login)

        if (existingGraduationStudent) {
            return res.status(httpStatus.BAD_REQUEST).json({
                error: true,
                message: existingGraduationStudent.message,
                errorName: existingGraduationStudent.name
            })
        }

        const { error, teacher } = await ProfessorIsFController.post(req, res, 0)
        
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
            teacher
        })

    }

    async get(_, res){
        try {
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
            
            return res.status(200).json(graduationStudents)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }

    }
}

export default new AlunoGraduacaoController()