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
                return res.status(422).json({
                    msg: "Aluno ja cadastrado na turma"
                })
            }
        } catch (error) {
            return res.status(400).json(error)
        }
        


        try {
            const comprovante = await AlunoIsFParticipaTurmaOC.create({
                idTurma: req.body.idTurma,
                login: req.body.login,
                inicio: req.body.inicio,
                termino: req.body.termino || null
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }
}

export default new AlunoIsFParticipaTurmaOCController()