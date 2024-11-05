import * as Yup from 'yup'

// Models
import InstituicaoEnsinoBrasileira from '../../models/instituicao/instituicaoensinobrasileira'
import instituicaoEnsinoController from './instituicaoEnsinoController'

// Utils
import MESSAGES from '../../utils/messages/messages_pt'
import CustomError from '../../utils/CustomError/CustomError'
import httpStatus from '../../utils/httpStatus/httpStatus'

class instituicaoEnsinoBrasileiraController {
    async post(req, res){
        const institution = await instituicaoEnsinoController.post(req, res, 1)

        const brazilianInstitution = await institution.createInstituicaoEnsinoBrasileira({
            CNPJ: req.body.CNPJ,
            sigla: req.body.sigla
        })

        return res.status(httpStatus.CREATED).json(brazilianInstitution)
    }

    async get(_, res) {
        const institutions = await InstituicaoEnsinoBrasileira.findAll()

        return res.status(httpStatus.SUCCESS).json(institutions)
    }
}

export default new instituicaoEnsinoBrasileiraController()