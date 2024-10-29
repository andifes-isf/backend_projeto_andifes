import * as Yup from 'yup'
import InstituicaoEnsinoEstrangeira from '../../models/instituicao/instituicaoensinoestrangeira'
import instituicaoEnsinoController from './instituicaoEnsinoController'
import MESSAGES from '../../utils/messages/messages_pt'

class instituicaoEnsinoEstrangeiraController {
    async post(req, res){
        try {
            await instituicaoEnsinoController.post(req, res, 0)

            const existingInstitution = await InstituicaoEnsinoEstrangeira.findOne({
                where: {
                    pais: req.body.pais,
                    sigla: req.body.sigla
                }
            })
    
            if(existingInstitution) {
                return res.status(409).json({
                    error: `${existingInstitution.sigla} ` +  MESSAGES.ALREADY_IN_SYSTEM
                })
            }
    
            const institution = await InstituicaoEnsinoEstrangeira.create({
                pais: req.body.pais,
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
            const institutions = await InstituicaoEnsinoEstrangeira.findAll()

            return res.status(200).json(institutions)
        } catch (error) {
            return res.status(500).json(MESSAGES.INTERNAL_SERVER_ERROR + error)
        }
    }
}

export default new instituicaoEnsinoEstrangeiraController()