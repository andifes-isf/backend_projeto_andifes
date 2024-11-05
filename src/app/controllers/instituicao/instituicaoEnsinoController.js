import * as Yup from 'yup'

// Models
import InstituicaoEnsino from '../../models/instituicao/instituicaoensino'
import InstituicaoEnsinoEstrangeira from '../../models/instituicao/instituicaoensinoestrangeira'
import InstituicaoEnsinoBrasileira from '../../models/instituicao/instituicaoensinobrasileira'

// Utils
import { Op } from 'sequelize'
import MESSAGES from '../../utils/messages/messages_pt'
import CustomError from '../../utils/CustomError/CustomError'
import httpStatus from '../../utils/httpStatus/httpStatus'

class instituicaoEnsinoController {
    async post(req, res, brasileira){
        const existingInstitution = await InstituicaoEnsino.findOne({
            where: {
                [Op.or]: [{nome: req.body.nome}, {documentoVinculo: req.body.documentoVinculo}]
            }
        })

        if(existingInstitution) {
            throw new CustomError(`"${existingInstitution.nome}" ou "${existingInstitution.documentoVinculo}"` + MESSAGES.ALREADY_IN_SYSTEM, httpStatus.BAD_REQUEST)
        }

        let acronymRegistered

        if (brasileira == 1) {
            acronymRegistered = ( await InstituicaoEnsinoBrasileira.findOne({
                where: {
                    [Op.or]: [{sigla: req.body.sigla}, {CNPJ: req.body.CNPJ}]
                }
            }) ) !== null
        } else {
            acronymRegistered = ( await InstituicaoEnsinoEstrangeira.findOne({
                where: {
                    sigla: req.body.sigla
                }
            }) ) !== null
        }

        if(acronymRegistered) {
            throw new CustomError(`${req.body.sigla} ${brasileira == 1 ? `ou ${req.body.CNPJ}` : ""}` + MESSAGES.EXISTING_ACRONYM, httpStatus.BAD_REQUEST)
        }


        return await InstituicaoEnsino.create({
            nome: req.body.nome,
            documentoVinculo: req.body.documentoVinculo,
            brasileira: brasileira
        })
    }

    async get(_, res) {
        const institutions = await InstituicaoEnsino.findAll()

        return res.status(httpStatus.SUCCESS).json(institutions)
    }
}

export default new instituicaoEnsinoController()