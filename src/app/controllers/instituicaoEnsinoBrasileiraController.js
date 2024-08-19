import * as Yup from 'yup'
import InstituicaoEnsinoBrasileira from '../models/instituicaoensinobrasileira'
import InstituicaoEnsino from '../models/instituicaoensino'

class instituicaoEnsinoBrasileiraController {
    async post(req, res){
        try {
            await InstituicaoEnsino.post(req, res, 1)

            const instituicaoExistente = await InstituicaoEnsinoBrasileira.findOne({
                where: {
                    CNPJ: req.body.CNPJ
                }
            })
    
            if(instituicaoExistente) {
                return res.status(409).json({
                    msg: "Instituicao de Ensino Brasileira ja cadastrada"
                })
            }
    
            const instituicao = await InstituicaoEnsinoBrasileira.create({
                CNPJ: req.body.CNPJ,
                idInstituicao: req.body.idInstituicao,
                sigla: req.body.sigla
            })
    
            return res.status(201).json(instituicao)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }

    async get(_, res) {
        try {
            const instituicoes = await InstituicaoEnsinoBrasileira.findAll()

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new instituicaoEnsinoBrasileiraController()