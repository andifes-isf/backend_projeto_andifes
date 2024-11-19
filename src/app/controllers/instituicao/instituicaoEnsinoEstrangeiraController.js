import * as Yup from 'yup'

// Models
import InstituicaoEnsinoEstrangeira from '../../models/instituicao/instituicaoensinoestrangeira'
import instituicaoEnsinoController from './instituicaoEnsinoController'

// Utils
import MESSAGES from '../../utils/response/messages/messages_pt'
import httpStatus from '../../utils/response/httpStatus/httpStatus'
import CustomError from '../../utils/response/CustomError/CustomError'

class instituicaoEnsinoEstrangeiraController {
    async post(req, res){
        const institution = await instituicaoEnsinoController.post(req, res, 0)

        const foreignInstitution = await institution.createInstituicaoEnsinoEstrangeira({
            pais: req.body.pais,
            sigla: req.body.sigla
        })

        return res.status(httpStatus.CREATED).json(foreignInstitution)
    }

    async get(_, res) {
        const institutions = await InstituicaoEnsinoEstrangeira.findAll()

        return res.status(httpStatus.SUCCESS).json(institutions)
    }
}

export default new instituicaoEnsinoEstrangeiraController()