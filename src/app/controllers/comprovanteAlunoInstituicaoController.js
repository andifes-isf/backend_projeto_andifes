import * as Yup from 'yup'
import ComprovanteAlunoInstituicao from '../models/comprovantealunoinstituicao'

class ComprovanteAlunoInstituicaoController {
    async post(req, res) {
        const comprovanteExistente = await ComprovanteAlunoInstituicao.findOne({
            where: {
                login: req.body.login,
                idInstituicao: req.body.idInstituicao,
                inicio: req.body.inicio
            }
        })

        if(comprovanteExistente) {
            return res.status(422).json({
                msg: "Comprovante de Aluno ja cadastrado"
            })
        }

        try {
            const comprovante = await ComprovanteAlunoInstituicao.create({
                idInstituicao: req.body.idInstituicao,
                login: req.body.login,
                inicio: req.body.inicio,
                termino: req.body.termino || null,
                comprovante: req.body.comprovante
            })
    
            return res.status(201).json(comprovante)    
        } catch (error) {
            return res.status(422).json(error.message)
        }

    }
}

export default new ComprovanteAlunoInstituicaoController()