import * as Yup from 'yup'
import InstituicaoEnsinoBrasileira from '../../models/instituicao/instituicaoensinobrasileira'
import instituicaoEnsinoController from './instituicaoEnsinoController'
import MESSAGES from '../../utils/messages/messages_pt'

class instituicaoEnsinoBrasileiraController {
    async post(req, res){
        try {
            await instituicaoEnsinoController.post(req, res, 1)

            const existingInstitution = await InstituicaoEnsinoBrasileira.findOne({
                where: {
                    CNPJ: req.body.CNPJ
                }
            })
    
            if(existingInstitution) {
                return res.status(409).json({
                    error: `${existingInstitution.sigla} ` + MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const institution = await InstituicaoEnsinoBrasileira.create({
                CNPJ: req.body.CNPJ,
                idInstituicao: req.body.idInstituicao,
                sigla: req.body.sigla
            })
    
            return res.status(201).json(institution)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }

    async get(_, res) {
        try {
            const institutions = await InstituicaoEnsinoBrasileira.findAll()

            return res.status(200).json(institutions)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new instituicaoEnsinoBrasileiraController()