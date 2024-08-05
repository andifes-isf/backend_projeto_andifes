import * as Yup from 'yup'
import ComprovanteProfessorInstituicao from '../models/comprovanteprofessorinstituicao'

class ComprovanteProfessorInstituicaoController {
    async post(req, res) {
        const comprovanteExistente = await ComprovanteProfessorInstituicao.findOne({
            where: {
                login: req.body.login,
                idInstituicao: req.body.idInstituicao,
                inicio: req.body.inicio
            }
        })

        if(comprovanteExistente) {
            return res.status(422).json({
                msg: "Comprovante de Professor ja cadastrado"
            })
        }

        try {
            const comprovante = await ComprovanteProfessorInstituicao.create({
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

export default new ComprovanteProfessorInstituicaoController()