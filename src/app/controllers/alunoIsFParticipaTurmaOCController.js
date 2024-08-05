import * as Yup from 'yup'
import AlunoIsFParticipaTurmaOC from '../models/alunoisfparticipaturmaoc'

class AlunoIsFParticipaTurmaOCController {
    async post(req, res) {
        const relacao = await AlunoIsFParticipaTurmaOC.findOne({
            where: {
                login: req.body.login,
                idTurma: req.body.idInstituicao,
                inicio: req.body.inicio
            }
        })

        if(comprovanteExistente) {
            return res.status(422).json({
                msg: "Aluno ja cadastrado na turma"
            })
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