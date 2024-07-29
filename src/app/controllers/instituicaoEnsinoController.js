import * as Yup from 'yup'
import InstituicaoEnsino from '../models/instituicaoensino'

class instituicaoEnsinoController {
    async post(req, res){
        const instituicaoExistente = await InstituicaoEnsino.findOne({
            where: {
                nome: req.body.nome
            }
        })

        if(instituicaoExistente) {
            return res.status(422).json({
                msg: "Instituicao de Ensino ja cadastrada"
            })
        }

        const instituicao = await InstituicaoEnsino.create({
            nome: req.body.nome,
            documentoVinculo: req.body.documentoVinculo,
            brasileira: req.body.brasileira
        })

        return res.status(201).json(instituicao)
    }
}

export default new instituicaoEnsinoController()