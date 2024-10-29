import * as Yup from 'yup'
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import MESSAGES from '../../utils/messages/messages_pt'

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        try {
            const existingInstitution = await InstituicaoEnsino.findOne({
                where: {
                    nome: req.body.nome
                }
            })
    
            if(existingInstitution) {
                return 0
            }
    
            return await InstituicaoEnsino.create({
                nome: req.body.nome,
                documentoVinculo: req.body.documentoVinculo,
                brasileira: brasileira
            })
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async get(_, res) {
        try {
            const institutions = await InstituicaoEnsino.findAll()

            return res.status(200).json(institutions)
        } catch (error) {
            return res.status(500).json("Ocorreu um erro interno no servidor: " + error)
        }
    }
}

export default new instituicaoEnsinoController()