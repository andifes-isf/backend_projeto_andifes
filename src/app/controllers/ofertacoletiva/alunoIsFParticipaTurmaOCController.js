import * as Yup from 'yup'

// Models
import AlunoIsFParticipaTurmaOC from '../../models/ofertacoletiva/alunoisfparticipaturmaoc'
import ProeficienciaAlunoIsf from '../../models/proeficiencia/proeficienciaalunoisf'
import TurmaOC from '../../models/ofertacoletiva/turmaoc'
import Curso from '../../models/ofertacoletiva/curso'

// Classe auxiliar
import nivelFactory from '../../utils/niveis/nivelFactory'
import nivelProeficiencia from '../../utils/niveis/nivel'

class AlunoIsFParticipaTurmaOCController {

    async post(req, res) {

        try {
            if(!(req.tipoUsuario === 'alunoisf')){
                return res.status(404).json({
                    error: 'Acesso negado'
                })
            }
    
            // Verifica se o aluno já está inserido na turma
            const alunoNaTurma = await AlunoIsFParticipaTurmaOC.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })

            if(alunoNaTurma){
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            // Verificando se o aluno pode se inscrever na turma
            const turma = await TurmaOC.findOne({
                where: {
                    idTurma: req.body.idTurma
                }
            })

            if(!turma){
                return res.status(422).json({
                    msg: "Turma nao encontrada"
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
                    msg: `${req.loginUsuario} possui proeficiencia muito abaixo da proeficiencia do curso (${curso.nivel})`
                })
            }

            // Inserindo o aluno na turma
            const relacao = await AlunoIsFParticipaTurmaOC.create({
                login: req.loginUsuario,
                idTurma: req.body.idTurma,
                inicio: req.body.inicio,
                termino: req.body.termino
            })

            return res.status(201).json(relacao)

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }    
    }
}

export default new AlunoIsFParticipaTurmaOCController()