import * as Yup from 'yup'
import InstituicaoEnsinoEstrangeira from '../../models/instituicao/instituicaoensinoestrangeira'
import instituicaoEnsinoController from './instituicaoEnsinoController'

class instituicaoEnsinoEstrangeiraController {
    async post(req, res){
        try {
            await instituicaoEnsinoController.post(req, res, 0)

            const instituicaoExistente = await InstituicaoEnsinoEstrangeira.findOne({
                where: {
                    pais: req.body.pais,
                    sigla: req.body.sigla
                }
            })
    
            if(instituicaoExistente) {
                return res.status(409).json({
                    msg: "Instituicao de Ensino Estrangeira ja cadastrada"
                })
            }
    
            const instituicao = await InstituicaoEnsinoEstrangeira.create({
                pais: req.body.pais,
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
            const instituicoes = await InstituicaoEnsinoEstrangeira.findAll()

            return res.status(200).json(instituicoes)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new instituicaoEnsinoEstrangeiraController()