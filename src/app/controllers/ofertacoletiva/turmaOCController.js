// Models
import TurmaOC from "../../models/ofertacoletiva/turmaoc"
import Curso from '../../models/ofertacoletiva/curso'
import ProfessorIsF from '../../models/usuarios/professorisf'

// Utils
import UserTypes from "../../utils/userType/userTypes"
import httpStatus from "../../utils/response/httpStatus/httpStatus"
import MESSAGES from "../../utils/response/messages/messages_pt"
import CustomError from "../../utils/response/CustomError/CustomError"

class turmaOCController {
    static async verifyExistingClass(name) {
        const existingClass = await TurmaOC.findOne({
            where: {
                nome: name
            }
        })

        if(existingClass) {
            throw new CustomError(name + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }
    }

    async post(req, res) {        
        // verificar quem mais pode criar uma turma
        if(!(req.tipoUsuario === UserTypes.CURSISTA || req.tipoUsuario === UserTypes.ISF_TEACHER)) {
            throw new CustomError(MESSAGES.ACCESS_DENIED, httpStatus.UNAUTHORIZED)
        }

        await turmaOCController.verifyExistingClass(req.body.nome)

        const classObject = await TurmaOC.create({
            idCurso: req.body.idCurso,
            nVagas: req.body.nVagas,
            nome: req.body.nome,
            nInscritos: req.body.nInscritos,
            nConcluintes: req.body.nConcluintes,
            nReprovados: req.body.nReprovados,
        })

        return res.status(201).json(classObject)
    }

    async get(_, res) {
        const classes = await TurmaOC.findAll({
            include: [
                {
                    model: Curso,
                    attributes: ['nome', 'idioma', 'categoria', 'nivel', 'cargaHoraria']
                },
                {
                    model: ProfessorIsF,
                    attributes: {
                        exclude: ['poca']
                    },
                    through: {
                        attributes: {
                            exclude: ['login', 'idTurma'],
                            include: ['inicio', 'termino']
                        }
                    }
                }
            ],
            order: [
                ['idCurso', 'ASC'],
                ['idTurma', 'ASC']
            ]
        })

        return res.status(httpStatus.SUCCESS).json(classes)
    }

}

export default new turmaOCController()