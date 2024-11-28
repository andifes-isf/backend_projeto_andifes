import * as Yup from 'yup'

// Models
import AlunoIsFParticipaTurmaOC from '../../models/ofertacoletiva/alunoisfparticipaturmaoc'
import ProeficienciaAlunoIsf from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'
import Curso from '../../models/ofertacoletiva/curso'

// Utils
import nivelFactory from '../../utils/niveis/nivelFactory'
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/response/messages/messages_pt'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import CustomError from '../../utils/response/CustomError/CustomError'


class AlunoIsFParticipaTurmaOCController {

    static async verifyExistingClass(classId) {
        const classObject = await TurmaOC.findOne({
            where: {
                idTurma: classId
            }
        })

        if(!classObject){
            throw new CustomError(`Turma ${classId} ` + MESSAGES.NOT_FOUND, httpStatus.BAD_REQUEST)
        }   

        return classObject
    }

    static async verifyStudentInClass(login, classId) {
        const studentInClass = await AlunoIsFParticipaTurmaOC.findOne({
            where: {
                login: login,
                idTurma: classId
            }
        })

        if(studentInClass){
            throw new CustomError(`${login} ` + MESSAGES.ALREADY_IN_CLASS, httpStatus.BAD_REQUEST)
        }
    }

    static async verifyStudentProeficiency(course, proeficiency) {
        const proeficiencyLevel = nivelFactory.createInstanceOfNivel(course.idioma)

        const levelDifference = proeficiencyLevel.distanciaEntreNiveis(proeficiency ? proeficiency.nivel : 'nenhum', course.nivel)
        
        if(levelDifference < -1) {
            throw new CustomError(MESSAGES.USER_WITHOUT_PROEFICIENCY_LEVEL, httpStatus.BAD_REQUEST)
        }
    }
 
    async post(req, res) {
        if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
            throw new CustomError(MESSAGES.ACCESS_DENIED, httpStatus.NOT_FOUND)
        }



        const classObject = await AlunoIsFParticipaTurmaOCController.verifyExistingClass(req.params.idTurma)
        
        await AlunoIsFParticipaTurmaOCController.verifyStudentInClass(req.loginUsuario, req.params.idTurma)
        
        const course = await Curso.findOne({
            where: {
                idCurso: classObject.idCurso
            }
        })
        
        const studentProeficiency = await ProeficienciaAlunoIsf.findOne({
            where: {
                login: req.loginUsuario,
                idioma: course.idioma
            },
            order: [
                ['nivel', 'DESC']
            ],
            limit: 1
        })

        await AlunoIsFParticipaTurmaOCController.verifyStudentProeficiency(course, studentProeficiency)

        const relation = await AlunoIsFParticipaTurmaOC.create({
            login: req.loginUsuario,
            idTurma: req.params.idTurma,
            inicio: req.body.inicio,
            termino: req.body.termino
        })

        return res.status(httpStatus.CREATED).json(relation)
    }
}

export default new AlunoIsFParticipaTurmaOCController()