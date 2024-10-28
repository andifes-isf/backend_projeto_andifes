import * as Yup from 'yup'

// Models
import AlunoIsFParticipaTurmaOC from '../../models/ofertacoletiva/alunoisfparticipaturmaoc'
import ProeficienciaAlunoIsf from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'
import Curso from '../../models/ofertacoletiva/curso'

// Classe auxiliar
import nivelFactory from '../../utils/niveis/nivelFactory'
import nivelProeficiencia from '../../utils/niveis/nivel'
import UserTypes from '../../utils/userType/userTypes'
import MESSAGES from '../../utils/messages/messages_pt'

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === UserTypes.ISF_STUDENT)){
                return res.status(404).json({
                    error: MESSAGES.ACCESS_DENIED
                })
            }
    
            const studentInClass = await AlunoIsFParticipaTurmaOC.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })

            if(studentInClass){
                return res.status(409).json({
                    error: `${studentInClass.login} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }

            const turma = await TurmaOC.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })

            if(!turma){
                return res.status(422).json({
                    error: `Turma ${req.body.idTurma} ` + MESSAGES.NOT_FOUND
                })
            }   
            
            const curso = await Curso.findOne({
                where: {
                    idCurso: turma.idCurso
                }
            })
            
            const proeficienciaAluno = await ProeficienciaAlunoIsf.findOne({
                where: {
                    login: req.loginUsuario,
                    idioma: curso.idioma
                },
                order: [
                    ['nivel', 'DESC']
                ],
                limit: 1
            })

            const nivelProeficiencia = nivelFactory.createInstanceOfNivel(curso.idioma)
            const diferencaEntreNivel = nivelProeficiencia.distanciaEntreNiveis(proeficienciaAluno ? proeficienciaAluno.nivel : 'nenhum', curso.nivel)
            if(diferencaEntreNivel < -1) {
                return res.status(422).json({
                    error: MESSAGES.STUDENT_WITHOUT_PROEFICIENCY_LEVEL
                })
            }

            const relacao = await AlunoIsFParticipaTurmaOC.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino
            })

            return res.status(201).json(relacao)

        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }    
    }
}

export default new AlunoIsFParticipaTurmaOCController()