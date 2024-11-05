// Models
import ProfessorIsFMinistraTurmaOC from "../../models/ofertacoletiva/professorisfministraturmaoc"
import ProeficienciaProfessorIsf from '../../models/proeficiencia/proeficienciaprofessorisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'
import Curso from '../../models/ofertacoletiva/curso'

// Utils
import nivelFactory from '../../utils/niveis/nivelFactory'
import MESSAGES from "../../utils/messages/messages_pt"
import UserTypes from '../../utils/userType/userTypes'
import httpStatus from "../../utils/httpStatus/httpStatus"
import CustomError from "../../utils/CustomError/CustomError"

class ProfessorIsFMinistraTurmaOCController {
    static async verifyExistingClass(classId) {
        const classObject = await TurmaOC.findByPk(classId)

        if (!classObject) {
            throw new CustomError(`Turma ${classId} ` + MESSAGES.NOT_FOUND, httpStatus.BAD_REQUEST)
        }

        return classObject
    }

    static async verifyTeacherMinisteringClass(login, classId) {
        const teacherMinisteringClass = await ProfessorIsFMinistraTurmaOC.findOne({
            where: {
                login: login,
                idTurma: classId
            }
        })

        if(teacherMinisteringClass){
            throw new CustomError(`${login} ` + MESSAGES.ALREADY_MINISTERING_CLASS, httpStatus.BAD_REQUEST)
        }
    }

    static async verifyTeacherProeficiency(course, proeficiency) {
        const proeficiencyLevel = nivelFactory.createInstanceOfNivel(course.idioma)

        const levelDifference = proeficiencyLevel.distanciaEntreNiveis(proeficiency ? proeficiency.nivel : 'nenhum', course.nivel)

        if(levelDifference < 0) {
            throw new CustomError(MESSAGES.USER_WITHOUT_PROEFICIENCY_LEVEL, httpStatus.BAD_REQUEST)
        }
    }

    async post(req, res) {
        if(!(req.tipoUsuario === UserTypes.ISF_TEACHER || req.tipoUsuario === UserTypes.CURSISTA)){
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: MESSAGES.ACCESS_DENIED
            })
        }
        
        const classObejct = await ProfessorIsFMinistraTurmaOCController.verifyExistingClass(req.params.idTurma)

        await ProfessorIsFMinistraTurmaOCController.verifyTeacherMinisteringClass(req.loginUsuario, req.params.idTurma)

        // Precisa verificar se um Docente Orientador pode associar um orientando a uma turma
        
        const course = await Curso.findOne({
            where: {
                idCurso: classObejct.idCurso
            }
        })
        
        const teacherProeficiency = await ProeficienciaProfessorIsf.findOne({
            where: {
                login: req.loginUsuario,
                idioma: course.idioma
            }
        })
        
        await ProfessorIsFMinistraTurmaOCController.verifyTeacherProeficiency(course, teacherProeficiency)
                
        const relation = await ProfessorIsFMinistraTurmaOC.create({
            login: req.loginUsuario,
            idTurma: req.params.idTurma,
            inicio: req.body.inicio,
            termino: req.body.termino,
        })
        
        return res.status(httpStatus.CREATED).json(relation)

    }
}

export default new ProfessorIsFMinistraTurmaOCController()