import * as Yup from 'yup'
import AlunoIsFParticipaTurmaOC from '../models/alunoisfparticipaturmaoc'
import ProeficienciaAlunoIsf from '../models/proeficienciaalunoisf'
import TurmaOC from '../models/turmaoc'
import Curso from '../models/curso'

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
                }
            })
    
            console.log(proeficienciaAluno.nivel)
    
            if(curso.idioma === 'japones') {
                if(proeficienciaAluno == null) {
                    if(!(curso.nivel === "n5")) {
                        return res.status(422).json({
                            msg: `Esse curso é de nivel ${curso.nivel}. Para começar a aprender ${curso.idioma}, é preciso começar pelo nivel N5`
                        })
                    }
                }
                if(curso.nivel < proeficienciaAluno.nivel){
                    return res.status(422).json({
                        msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaAluno.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                    })
                }
            } else {
                if(proeficienciaAluno == null) {
                    if(!(curso.nivel === "A1")) {
                        return res.status(422).json({
                            msg: `Esse curso é de nivel ${curso.nivel}. Para começar a aprender ${curso.idioma}, é preciso começar pelo nivel A1`
                        })
                    }
                }
                if(curso.nivel > proeficienciaAluno.nivel){
                    return res.status(422).json({
                        msg: `${req.loginUsuario} possui proeficiencia ${proeficienciaAluno.nivel} que é abaixo da proeficiencia do curso (${curso.nivel})`
                    })
                }
            }
    
            const relacao = await AlunoIsFParticipaTurmaOC.findOne({
                where: {
                    login: req.loginUsuario,
                    idTurma: req.body.idTurma
                }
            })
            
            if(relacao) {
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            const comprovante = await AlunoIsFParticipaTurmaOC.create({
                idTurma: req.body.idTurma,
                login: req.loginUsuario,
                inicio: req.body.inicio,
                termino: req.body.termino || null
            })

        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }    
    }
}

export default new AlunoIsFParticipaTurmaOCController()