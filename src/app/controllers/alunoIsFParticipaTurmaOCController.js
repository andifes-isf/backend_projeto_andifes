import * as Yup from 'yup'
import AlunoIsFParticipaTurmaOC from '../models/alunoisfparticipaturmaoc'

class AlunoIsFParticipaTurmaOCController {
    async post(req, res) {
        try {
            const relacao = await AlunoIsFParticipaTurmaOC.findOne({
                where: {
                    login: req.body.login,
                    idTurma: req.body.idTurma,
                    inicio: req.body.inicio
                }
            })
            
            if(relacao) {
                return res.status(409).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }

            const comprovante = await AlunoIsFParticipaTurmaOC.create({
                idTurma: req.body.idTurma,
                login: req.body.login,
                inicio: req.body.inicio,
                termino: req.body.termino || null
            })
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new AlunoIsFParticipaTurmaOCController()