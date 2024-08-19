import * as Yup from 'yup'

// Models
import AlunoIsFParticipaTurmaOC from '../models/alunoisfparticipaturmaoc'
import ProeficienciaAlunoIsf from '../models/proeficienciaalunoisf'
import TurmaOC from '../models/turmaoc'
import Curso from '../models/curso'

// Classe auxiliar
import nivelFactory from '../utils/factories/nivelFactory'

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(404).json({
                    error: 'Acesso negado'
                })
            }
    
            const turma = await TurmaOC.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })
    
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
                    msg: `${req.loginUsuario} possui proeficiencia muito abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }

            return res.status(201).json("asdfasdf")

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }    
    }
}

export default new AlunoIsFParticipaTurmaOCController()