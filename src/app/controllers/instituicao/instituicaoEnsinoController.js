import * as Yup from 'yup'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        try {
            const instituicaoExistente = await InstituicaoEnsino.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(instituicaoExistente) {
                return 0
            }
    
            return await InstituicaoEnsino.create({
                nome: req.body.nome,
                documentoVinculo: req.body.documentoVinculo,
                brasileira: brasileira
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const instituicoes = await InstituicaoEnsino.findAll()

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new instituicaoEnsinoController()